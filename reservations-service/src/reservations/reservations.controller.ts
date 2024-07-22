import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { FLIGHT_SERVICE } from 'src/config';
import { IssuedReservationDto } from './dto/issuedReservation.dto';

@Controller()
export class ReservationsController {
  constructor( private readonly reservationsService: ReservationsService ) { }

  @MessagePattern('createReservation' )
  async create(@Payload() createReservationDto: CreateReservationDto) {   
    
    const reservation = await this.reservationsService.create(createReservationDto);
    const paymentSession = await this.reservationsService.createPaymentSession(reservation);

    return {
      reservation,
      paymentSession
    }            
  }

  // @MessagePattern('findReservationByPnr' )
  // findOneByPnr(@Payload() pnrLocator: string) {

  //   return this.reservationsService.findOneByPnr(pnrLocator);
  // }
  @MessagePattern('findReservationByPnr' )
  findOneById(@Payload() id: string) {
    return this.reservationsService.findOneById(id);
  }

  @MessagePattern('payment.succeeded')
  @EventPattern('payment.succeeded')
  IssuerReservation(@Payload() issuedReservation : IssuedReservationDto) {
    return this.reservationsService.IssueReservation(issuedReservation);
    console.log({issuedReservation});
    return;
    
  }

  @MessagePattern('voidReservation')
  voidReservation(@Payload() id: number) {
    //return this.reservationsService.findOne(id);

  }


}
