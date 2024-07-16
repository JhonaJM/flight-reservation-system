import { Inject, Injectable, Logger } from '@nestjs/common';
import { envs, NATS_SERVICE } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymetsService {
    private readonly logger = new Logger(PaymetsService.name);
    private readonly stripe = new Stripe(envs.stripeSecret);
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
      ) {}
      
    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
        const { currency, pax, items, reservationId } = paymentSessionDto;
        const lineItems = items.map(item => {
            return {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.itinerary,
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: pax
            }
        });

        const session = await this.stripe.checkout.sessions.create({            
            payment_intent_data: {
                metadata: {
                    reservationId: reservationId
                }
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: envs.stripeSuccessUrl,
            cancel_url: envs.stripeCancelUrl

        });

        return {
            cancelUrl : session.cancel_url,
            succcessUrl : session.success_url,
            url : session.url
        };
    }

    async stripeWebhook(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'];
        let event: Stripe.Event;
        const endpoint_secret = envs.stripeEndpointSecret;

        try {
            console.log(req['rawBody']);
            event = this.stripe.webhooks.constructEvent(
                req['rawBody'],
                sig,
                endpoint_secret
            )
        } catch (error) {
            res.status(400).send(`Webhook error: ${error.message}`);
            return;
        }

        console.log({ event });

        switch (event.type) {
            case 'charge.succeeded':
                const chargeSucceeded = event.data.object;
                const payload = {
                    stripePaymentId : chargeSucceeded.id,
                    reservationId:chargeSucceeded.metadata.reservationId,
                    receiptUrl:chargeSucceeded.receipt_url
                };
                                
                this.client.emit('payment.succeeded',payload);

                break;
            default:
                console.log('event not handle');
        }


        return res.status(200).json({ sig });

    }

}


