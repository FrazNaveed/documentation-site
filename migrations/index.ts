import * as migration_20241001_194129_initial from './20241001_194129_initial';

export const migrations = [
  {
    up: migration_20241001_194129_initial.up,
    down: migration_20241001_194129_initial.down,
    name: '20241001_194129_initial'
  },
];
