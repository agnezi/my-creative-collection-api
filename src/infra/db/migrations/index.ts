import { createClientCollectionsTable } from './createClientCollectionsTable';
import { createClientUsersTable } from './createClientUsersTable';
import { createUUIDExtension } from './createUUIDExtension';

export const migrations = async () => {
  if (process.env.CREATE_TABLES === 'false') return;

  await createUUIDExtension();
  await createClientUsersTable();
  await createClientCollectionsTable();
};
