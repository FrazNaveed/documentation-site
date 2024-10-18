import * as migration_20241018_190104 from './20241018_190104';
import * as migration_20241018_195345 from './20241018_195345';

export const migrations = [
  {
    up: migration_20241018_190104.up,
    down: migration_20241018_190104.down,
    name: '20241018_190104',
  },
  {
    up: migration_20241018_195345.up,
    down: migration_20241018_195345.down,
    name: '20241018_195345'
  },
];
