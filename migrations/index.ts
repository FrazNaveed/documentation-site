import * as migration_20241018_190104 from './20241018_190104';

export const migrations = [
  {
    up: migration_20241018_190104.up,
    down: migration_20241018_190104.down,
    name: '20241018_190104'
  },
];
