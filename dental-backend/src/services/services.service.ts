import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  private services: any[] = [];

  create(service: CreateServiceDto) {
    const TAX = 0.12;
    const priceWithTax = service.price + service.price * TAX;
    const newService = { id: Date.now(), ...service, priceWithTax };
    this.services.push(newService);
    return newService;
  }

  findAll() {
    return this.services;
  }
}
