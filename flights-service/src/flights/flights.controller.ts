import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { MessagePattern, Payload,EventPattern } from '@nestjs/microservices';
import { CreateFlightDto, PaginationFiltersDto, UpdateFlightDto } from './dto';
import { UpdateSeatsDto } from './dto/updateSeats.dto';
import { OriginDestinationDto } from './dto/origin-destination.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}
  
  @MessagePattern('createFlight')
  create(@Payload() createFlightDto: CreateFlightDto) {    
    return this.flightsService.create(createFlightDto);
  }

  @MessagePattern('findManyFlights')
  findAll(@Payload() paginationFiltersDto: PaginationFiltersDto) {
    return this.flightsService.findAll(paginationFiltersDto);
  }

  @MessagePattern('availability')
  availability(@Payload() originDestinationDto: OriginDestinationDto) {
    return this.flightsService.availability(originDestinationDto);
  }

  @MessagePattern('findOneFlight')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.flightsService.findOne(id);
  }

 
  @MessagePattern('updateFlight')
  update(@Payload() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(updateFlightDto.id, updateFlightDto);
  }

  @MessagePattern('deleteFlight')
  remove(@Payload('id') id: string) {
    return this.flightsService.remove(+id);
  }


  @MessagePattern('validateFlights')
  validateFlights(@Payload() ids: number[]) {
    return this.flightsService.validateFlights(ids);
  }
  
  @MessagePattern('update.flight.seats')
  @EventPattern('update.flight.seats')
  updateFlightSeats(@Payload() data: UpdateSeatsDto) {
    return this.flightsService.updateFlightSeats(data);
  }


}
