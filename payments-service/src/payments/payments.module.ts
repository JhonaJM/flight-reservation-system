import { Module } from '@nestjs/common';
import { PaymetsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[NatsModule],
  controllers: [PaymentsController],
  providers: [PaymetsService],
})
export class PaymentsModule {}
