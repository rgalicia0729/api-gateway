// NestJS imports
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

// Local imports
import { AppModule } from './app.module';
import { envs } from './config';
import { RPCExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const logger = new Logger('api-gateway bootstrap');
  const PORT = envs.port;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RPCExceptionFilter());

  await app.listen(PORT);

  logger.log(`API Gateway is running on port ${PORT}`);
}
bootstrap();
