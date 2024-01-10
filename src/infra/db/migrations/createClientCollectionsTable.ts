import { query } from '..';

export const createClientCollectionsTable = async () => {
  await query(`
  BEGIN;
   DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'client_collections') THEN
        CREATE TABLE client_collections (
          collection_id UUID DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES client_users("user_id"),
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255),
          PRIMARY KEY (collection_id)
        );
      END IF;
    END $$;
  COMMIT;`);
};
