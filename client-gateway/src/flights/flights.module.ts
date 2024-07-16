import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[NatsModule],
  controllers: [FlightsController],
  providers: [],
})
export class FlightsModule { }
