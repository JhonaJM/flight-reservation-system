import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { envs } from './config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const  logger = new Logger(bootstrap.name);
  console.log(envs.natsServers)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport : Transport.NATS,
    options:{
      servers: envs.natsServers,
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform:true
    })
  );

  await app.listen();
  logger.log(`flight microservice in ${envs.port}`)
}
bootstrap();
