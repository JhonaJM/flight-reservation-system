import { Controller,Get, Inject, OnModuleInit } from '@nestjs/common';;
import {FlightsService}  from './flights.service';
import { ClientKafka } from '@nestjs/microservices';
@Controller('flights')
export class FlightsController implements OnModuleInit{
    constructor(
        private readonly flightsService: FlightsService,
        @Inject('FLIGHT_SERVICE') private readonly authClient : ClientKafka
    ) {}
    onModuleInit() {
        throw new Error('Method not implemented.');
    }


    @Get()
    async findAll(): Promise<any> {
        return this.flightsService.findAll();
      }
    
    
}
