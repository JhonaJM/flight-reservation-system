import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { IssuedReservationDto } from './dto/issuedReservation.dto';



@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(ReservationsService.name);
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Database connectec");
  }


  async create(createReservationDto: CreateReservationDto) {
    try {
      const flightIds = createReservationDto.segments.map(segment => segment.flightId);

      const flights: any[] = await firstValueFrom(
        this.client.send('validateFlights', flightIds)
      );

      const totalFlights = createReservationDto.segments.reduce((acc, segment) => {
        return flights.find((flight) => flight.id === segment.flightId).price;
      }, 0);
      const totalReservation = totalFlights * createReservationDto.passengers.length;
      const currency = createReservationDto.segments[0].currency;

      const reservation = await this.reservation.create({
        data: {
          pnrLocator: createReservationDto.pnrLocator,
          status: createReservationDto.status,
          currency: currency,
          ammount: totalReservation,
          Segments: {
            createMany: {
              data: createReservationDto.segments.map((segment) => {
                const flight = flights.find((f) => f.id === segment.flightId);
                return {
                  flightId: segment.flightId,
                  airlineCode: flight.airlineCode,
                  departureCity: flight.departureCity,
                  arrivalCity: flight.arrivalCity,
                  currency: flight.currency,
                  price: flight.price,
                }
              })
            }
          },
          Passengers: {
            createMany: {
              data: createReservationDto.passengers.map((passenger) => ({

                giveName: passenger.giveName,
                surName: passenger.surName,
                identification: passenger.identification,
                typeCode: passenger.typeCode,
                documentNumber: passenger.documentNumber,

              }))
            }
          },
        },
        include: {
          Segments: true,
          Passengers: true,
        }
      });

      if (reservation) {
        flights.map(async f => {
          await firstValueFrom(
            this.client.send('updateFlight', {
              id: f.id,
              availableSeats: f.availableSeats - reservation.Passengers.length
            })
          );
        });
      }

      return reservation;

    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }

  }

  findAll() {
    return `This action returns all reservations`;
  }

  async findOneByPnr(pnrLocator: string) {
    const reservation = await this.reservation.findFirst({
      where: { pnrLocator }
      , include: {
        Segments: true,
        Passengers: true,
        TicketInformation: true,
      }
    });

    if (!reservation)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Not found record locator  ${pnrLocator}`
      })

    return reservation;
  }

  async createPaymentSession(reservation: any) {

    const demo = {
      reservationId: reservation.id,
      pnrLocator: reservation.pnrLocator,
      currency: reservation.currency,
      pax: reservation.Passengers.length,
      items: reservation.Segments.map(s => {
        return {
          itinerary: `${s.departureCity}/${s.arrivalCity}`,
          price: s.price
        }
      })
    };
    console.log(demo);
    const paymentSession = await firstValueFrom(
      this.client.send('create.payment.session', {
        reservationId: reservation.id,
        pnrLocator: reservation.pnrLocator,
        currency: reservation.currency,
        pax: reservation.Passengers.length,
        items: reservation.Segments.map(s => {
          return {
            itinerary: `${s.departureCity}/${s.arrivalCity}`,
            price: s.price
          }
        })
      })

    )

    return paymentSession;
  }

  async IssueReservation(issuedReservationDto: IssuedReservationDto) {

    await this.reservation.update({
      where: { id: issuedReservationDto.reservationId },
      data: {
        status: 'ISSUED',
        receiptUrl: issuedReservationDto.receiptUrl,
        stripeChargeId: issuedReservationDto.stripePaymentId
      }
    });
  }
}
function onModuleInit() {
  throw new Error('Function not implemented.');
}

