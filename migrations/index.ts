import * as migration_20241018_190104 from './20241018_190104';
import * as migration_20241018_195345 from './20241018_195345';
import * as migration_20241019_010728 from './20241019_010728';
import * as migration_20241020_154000 from './20241020_154000';
import * as migration_20241022_002843 from './20241022_002843';
import * as migration_20241022_050153 from './20241022_050153';
import * as migration_20241023_212546 from './20241023_212546';
import * as migration_20241024_002947 from './20241024_002947';
import * as migration_20241024_173301 from './20241024_173301';
import * as migration_20241024_173626 from './20241024_173626';

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
    name: '20241020_154000',
  },
  {
    up: migration_20241022_002843.up,
    down: migration_20241022_002843.down,
    name: '20241022_002843',
  },
  {
    up: migration_20241022_050153.up,
    down: migration_20241022_050153.down,
    name: '20241022_050153',
  },
  {
    up: migration_20241023_212546.up,
    down: migration_20241023_212546.down,
    name: '20241023_212546',
  },
  {
    up: migration_20241024_002947.up,
    down: migration_20241024_002947.down,
    name: '20241024_002947',
  },
  {
    up: migration_20241024_173301.up,
    down: migration_20241024_173301.down,
    name: '20241024_173301',
  },
  {
    up: migration_20241024_173626.up,
    down: migration_20241024_173626.down,
    name: '20241024_173626'
  },
];
