import * as migration_20241018_190104 from './20241018_190104';
import * as migration_20241018_195345 from './20241018_195345';
import * as migration_20241019_010728 from './20241019_010728';
import * as migration_20241020_154000 from './20241020_154000';

export const migrations = [
  {
    up: migration_20241018_190104.up,
    down: migration_20241018_190104.down,
    name: '20241018_190104',
  },
  {
    up: migration_20241018_195345.up,
    down: migration_20241018_195345.down,
    name: '20241018_195345',
  },
  {
    up: migration_20241019_010728.up,
    down: migration_20241019_010728.down,
    name: '20241019_010728',
  },
  {
    up: migration_20241020_154000.up,
    down: migration_20241020_154000.down,
    name: '20241020_154000'
  },
];
