import { Module } from '@nestjs/common';

import { database } from './database';

@Module({
  providers: [
    {
      provide: 'DATABASE',
      useValue: database,
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}