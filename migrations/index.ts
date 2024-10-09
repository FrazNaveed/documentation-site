import * as migration_20241001_194129_initial from './20241001_194129_initial';
import * as migration_20241003_175554 from './20241003_175554';
import * as migration_20241004_004043 from './20241004_004043';
import * as migration_20241004_134606 from './20241004_134606';
import * as migration_20241004_155328 from './20241004_155328';
import * as migration_20241004_210109 from './20241004_210109';
import * as migration_20241005_014644 from './20241005_014644';
import * as migration_20241007_190934 from './20241007_190934';
import * as migration_20241008_001657 from './20241008_001657';
import * as migration_20241008_165939 from './20241008_165939';
import * as migration_20241009_191732 from './20241009_191732';

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
    up: migration_20241004_155328.up,
    down: migration_20241004_155328.down,
    name: '20241004_155328',
  },
  {
    up: migration_20241004_210109.up,
    down: migration_20241004_210109.down,
    name: '20241004_210109',
  },
  {
    up: migration_20241005_014644.up,
    down: migration_20241005_014644.down,
    name: '20241005_014644',
  },
  {
    up: migration_20241007_190934.up,
    down: migration_20241007_190934.down,
    name: '20241007_190934',
  },
  {
    up: migration_20241008_001657.up,
    down: migration_20241008_001657.down,
    name: '20241008_001657',
  },
  {
    up: migration_20241008_165939.up,
    down: migration_20241008_165939.down,
    name: '20241008_165939',
  },
  {
    up: migration_20241009_191732.up,
    down: migration_20241009_191732.down,
    name: '20241009_191732'
  },
];
