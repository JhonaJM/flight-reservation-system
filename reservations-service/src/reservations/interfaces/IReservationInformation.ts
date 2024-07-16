interface IReservationInformation {
  id: string; // Asumiendo que la reserva tiene un ID generado automáticamente
  pnrLocator: string;
  status: ReservationStatus;
  currency: string;
  ammount: number;
  Segments: ISegment[];
  Passengers: IPassenger[];
  createdAt: Date; // Asumiendo que hay campos de fecha de creación y actualización
  updatedAt: Date;
}

interface ISegment {
  id: string; // Asumiendo que el segmento tiene un ID generado automáticamente
  flightId: number;
  airlineCode: string;
  departureCity: string;
  arrivalCity: string;
  currency: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  reservationId: string | null;
}

interface IPassenger {
  id: string; // Asumiendo que el pasajero tiene un ID generado automáticamente
  giveName: string;
  surName: string;
  identification: TypeIdentification;
  documentNumber: string;
  typeCode: string;
  createdAt: Date;
  updatedAt: Date;
  reservationId: string | null;
}

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

enum TypeIdentification {
  DNI = 'DNI',
  PASSPORT = 'PASSPORT',
  OTHER = 'OTHER'
}