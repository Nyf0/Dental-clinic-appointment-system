import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  private clients: any[] = []; // pretend database

  create(client: CreateClientDto) {
    const newClient = { id: Date.now(), ...client };
    this.clients.push(newClient);
    return newClient;
  }

  findAll() {
    return this.clients;
  }
}
