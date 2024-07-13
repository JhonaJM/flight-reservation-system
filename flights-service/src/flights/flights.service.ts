import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class FlightsService {

    constructor(@Inject('FLIGHT_SERVICE') private readonly authClient : ClientKafka)
    {}
    
    findAll(): any {
        return { message: 'All flights' };
    }
}
