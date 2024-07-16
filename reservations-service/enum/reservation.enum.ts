import { ReservationStatus,TypeIdentification } from "@prisma/client";

// Puedes usar directamente el enum en tus funciones o lógica de negocio.
export const ReservationStatusList = [
    ReservationStatus.PENDING,
    ReservationStatus.ISSUED,
    ReservationStatus.VOIDED
];



export const TypeIdentificationList = [
    TypeIdentification.DNI,
    TypeIdentification.CARNET_EXTRANJERIA,
    TypeIdentification.PASSAPORTE
];