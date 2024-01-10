import { query } from 'infra/db';
import { CreateUserBody } from './user.services.types';

export const me = async (username?: string) => {
  if (!username) {
    return {
      data: {},
    };
  }

  const result = await query(
    `SELECT (username, email, user_id) FROM client_users WHERE username = $1`,
    [username],
  );
  if (result?.rows) {
    return {
      data: result?.rows[0],
    };
  }

  return {
    data: {},
  };
};

export const user = () => {
  return {
    data: {
      id: '1',
      username: 'test',
    },
  };
};
