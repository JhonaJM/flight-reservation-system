import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FlightsModule } from './flights/flights.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer:{
        groupId:'flight-consumer'
      }
    }
  });

  app.listen();
  
}
bootstrap();
