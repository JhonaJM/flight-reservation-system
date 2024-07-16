import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[NatsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
