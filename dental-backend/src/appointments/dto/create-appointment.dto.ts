export class CreateAppointmentDto {
  clientId: number;      // existing client
  serviceIds: number[];  // one or more services
  date: string;          // appointment date (ISO string for now)
}
