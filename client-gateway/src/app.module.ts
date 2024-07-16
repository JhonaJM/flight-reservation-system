import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [FlightsModule, ReservationsModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
