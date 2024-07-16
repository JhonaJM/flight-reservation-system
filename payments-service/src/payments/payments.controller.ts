import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymetsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response}  from 'express'
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymetsService: PaymetsService) {}

  @Post('create-payment-session')
  @MessagePattern('create.payment.session')
  createPaymentSession(@Body() paymentSessionDto : PaymentSessionDto){    
    return this.paymetsService.createPaymentSession(paymentSessionDto);  
  }
  
  @Get('sucess')
  sucess(){
    return {
      ok:true,
      message : 'Payment successful'
    }
  }

  @Get('cancel')
  cancel(){
    return {
      ok:true,
      message : 'Payment cancelled'
    }
  }


  @Post('webhook')
  async stripeWebHook (@Req() req : Request,@Res()res : Response){
    

    this.paymetsService.stripeWebhook(req,res);
    return 'stripeWebHook';
  }

}
