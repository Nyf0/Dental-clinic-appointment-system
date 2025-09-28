import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  // Create a new service
  async create(dto: CreateServiceDto): Promise<Service & { priceWithTax: number }> {
    const TAX = 0.12;

    // Build entity from DTO
    const service = this.serviceRepo.create({
      name: dto.name,
      price: dto.price,
    });

    // Save in DB
    const saved = await this.serviceRepo.save(service);

    // Return with computed priceWithTax (not stored in DB)
    return {
      ...saved,
      priceWithTax: Number(saved.price) + Number(saved.price) * TAX,
    };
  }

  // Find all services
  async findAll(): Promise<(Service & { priceWithTax: number })[]> {
    const TAX = 0.12;
    const services = await this.serviceRepo.find();

    return services.map((s) => ({
      ...s,
      priceWithTax: Number(s.price) + Number(s.price) * TAX,
    }));
  }
}
