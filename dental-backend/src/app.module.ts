import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // or your db host
      port: 5432,
      username: 'postgres',   // your postgres username
      password: 'pass',   // your postgres password
      database: 'dental_appointment',   // create this db in postgres
      autoLoadEntities: true,      // auto-load entities from your feature modules
      synchronize: true,           // auto-sync schema (ok for dev, turn off in prod)
    }),
    ClientsModule,
    ServicesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
