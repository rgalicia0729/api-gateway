// NestJS imports
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

// Local imports
import { envs } from '../config';

const importsExports = [
  ClientsModule.register([
    {
      name: envs.injectionToken,
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  ]),
];

@Module({
  imports: [...importsExports],
  exports: [...importsExports],
})
export class NatsModule {}
