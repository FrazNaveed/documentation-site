import * as migration_20241001_194129_initial from './20241001_194129_initial';
import * as migration_20241003_175554 from './20241003_175554';
import * as migration_20241004_004043 from './20241004_004043';
import * as migration_20241004_134606 from './20241004_134606';
import * as migration_20241004_211919 from './20241004_211919';
import * as migration_20241004_212654 from './20241004_212654';
import * as migration_20241004_214839 from './20241004_214839';
import * as migration_20241004_215030 from './20241004_215030';
import * as migration_20241004_215222 from './20241004_215222';
import * as migration_20241005_005012 from './20241005_005012';

export const migrations = [
  {
    up: migration_20241001_194129_initial.up,
    down: migration_20241001_194129_initial.down,
    name: '20241001_194129_initial',
  },
  {
    up: migration_20241003_175554.up,
    down: migration_20241003_175554.down,
    name: '20241003_175554',
  },
  {
    up: migration_20241004_004043.up,
    down: migration_20241004_004043.down,
    name: '20241004_004043',
  },
  {
    up: migration_20241004_134606.up,
    down: migration_20241004_134606.down,
    name: '20241004_134606',
  },
  {
    up: migration_20241004_211919.up,
    down: migration_20241004_211919.down,
    name: '20241004_211919',
  },
  {
    up: migration_20241004_212654.up,
    down: migration_20241004_212654.down,
    name: '20241004_212654',
  },
  {
    up: migration_20241004_214839.up,
    down: migration_20241004_214839.down,
    name: '20241004_214839',
  },
  {
    up: migration_20241004_215030.up,
    down: migration_20241004_215030.down,
    name: '20241004_215030',
  },
  {
    up: migration_20241004_215222.up,
    down: migration_20241004_215222.down,
    name: '20241004_215222',
  },
  {
    up: migration_20241005_005012.up,
    down: migration_20241005_005012.down,
    name: '20241005_005012'
  },
];
