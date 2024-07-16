import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateFlightDto, PaginationFiltersDto, UpdateFlightDto } from './dto';

@Controller('flights')
export class FlightsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  async createFlight(@Body() createFlightDto : CreateFlightDto) {
    
    try {
      const flight = await firstValueFrom(
        this.client.send('createFlight', createFlightDto)
      );

      return flight;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get()
  async findManyFlights(@Query() paginationFiltersDto: PaginationFiltersDto) {
    try {
      const flights = await firstValueFrom(
        this.client.send('findManyFlights', paginationFiltersDto)
      );

      return flights;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOneFlight(@Param('id') id: number) {
    try {
      const flight = await firstValueFrom(
        this.client.send('findOneFlight', { id })
      );
      return flight;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteFlight(@Param('id') id: number) {
    try {
      const flight = await firstValueFrom(
        this.client.send('deleteFlight', { id })
      );
      return flight;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Patch(':id')
  async patchFlight(@Param('id', ParseIntPipe) id: number, @Body() updateFlightDto: UpdateFlightDto) {
    try {
      const flight = await firstValueFrom(
        this.client.send('updateFlight', {id,...updateFlightDto})
      );
      return flight;
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
