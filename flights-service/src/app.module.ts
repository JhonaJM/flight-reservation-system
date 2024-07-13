import { Module } from '@nestjs/common';

import { FlightsModule } from './flights/flights.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsService } from './flights/flights.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FLIGHT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'flight',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'flight-consumer'
          }
        }
      },
    ]),
    FlightsModule
  ],
  controllers: [],
  providers: [FlightsService],
  exports : [FlightsService]
})
export class AppModule {}
