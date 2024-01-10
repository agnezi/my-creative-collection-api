import { query } from '..';

export const createClientUsersTable = async () => {
  // CREATE TABLE nome_da_tabela (
  //  nome_da_coluna tipo_de_dado constraints,
  // );
  // nome_da_coluna tipo_de_dado constraints
  await query(`
    BEGIN;
     DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'client_users') THEN
          CREATE TABLE client_users (
            user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL
          );
        END IF;
      END $$;
    COMMIT;`);
};
