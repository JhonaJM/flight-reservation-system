import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus } from '@nestjs/common';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { firstValueFrom } from 'rxjs';

@Controller('reservations')
export class ReservationsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {

    try {
      const reservation = await firstValueFrom(
        this.client.send('createReservation', createReservationDto)
      );

      return reservation;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get(':pnrLocator')
  async findOneByPnr(@Param('pnrLocator') pnrLocator: string) {
    try {
      const reservation = await firstValueFrom(
        this.client.send('findReservationByPnr', pnrLocator)
      );

      return reservation;
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
