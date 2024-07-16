import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const respose = ctx.getResponse();
    const rpcError = exception.getError();

    console.log(rpcError.toString());
    if(rpcError.toString().includes('Empty response'))
    {
      respose.status(500).json({
        status: 500,
        messge: rpcError.toString().substring(0,rpcError.toString().indexOf("(") - 1)
      });
    }

    if (typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : rpcError.status;
      return respose.status(status).json(rpcError);
    }

    respose.status(401).json({
      status: 401,
      messge: rpcError
    });


  }
}