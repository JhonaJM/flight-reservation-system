import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[NatsModule],
  controllers: [ReservationsController],
  providers: [],
})
export class ReservationsModule {}
