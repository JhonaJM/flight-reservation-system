
export enum ReservationStatus  {
    PENDING = 'PENDING',
    ISSUED = 'ISSUED',
    VOIDED = 'VOIDED'
}
// Puedes usar directamente el enum en tus funciones o lógica de negocio.
export const ReservationStatusList = [
    ReservationStatus.PENDING,
    ReservationStatus.ISSUED,
    ReservationStatus.VOIDED
];

export enum TypeIdentification  {
    DNI = 'DNI',
    CARNET_EXTRANJERIA = 'CARNET_EXTRANJERIA',
    PASSAPORTE = 'PASSAPORTE'
}

export const TypeIdentificationList = [
    TypeIdentification.DNI,
    TypeIdentification.CARNET_EXTRANJERIA,
    TypeIdentification.PASSAPORTE
];
