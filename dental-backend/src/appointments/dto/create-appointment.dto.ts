export class CreateAppointmentDto {
  clientId: number;      // references Client.id
  serviceIds: number[];  // references Service.id
  date: string;          // ISO date string
}
