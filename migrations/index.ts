import * as migration_20241001_194129_initial from './20241001_194129_initial';
import * as migration_20241003_175554 from './20241003_175554';
import * as migration_20241004_004043 from './20241004_004043';
import * as migration_20241004_134606 from './20241004_134606';
import * as migration_20241006_065908 from './20241006_065908';
import * as migration_20241007_062529 from './20241007_062529';

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
    up: migration_20241006_065908.up,
    down: migration_20241006_065908.down,
    name: '20241006_065908',
  },
  {
    up: migration_20241007_062529.up,
    down: migration_20241007_062529.down,
    name: '20241007_062529'
  },
];
