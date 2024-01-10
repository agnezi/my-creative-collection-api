import { query } from '..';

export const createUUIDExtension = async () => {
  await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);
};
