import config from 'config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const settings: IDBSettings = config.get('DB_SETTINGS');

export function getOrmConfig(): TypeOrmModuleOptions {
  let ormConfig: TypeOrmModuleOptions;

  if (process.env.NODE_ENV !== 'test') {
    ormConfig = {
      type: 'postgres',
      ...settings,
      database: `${settings.database}`,
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: false,
      maxQueryExecutionTime: 0.1 /** To log request runtime */,
      synchronize: false,
      cli: {
        migrationsDir: __dirname + '/migrations/**/*{.ts,.js}',
      },
    };
  } else {
    ormConfig = {
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      keepConnectionAlive: true,
      synchronize: true,
      cli: {
        migrationsDir: __dirname + '/migrations/**/*{.ts,.js}',
      },
    };
  }
  return ormConfig;
}
