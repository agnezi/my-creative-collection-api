import type { CreateUserBody } from 'business/users/user.services.types';
import { query } from 'infra/db';
import type { AuthSignIn, AuthSignUp } from './types';

const queries = {
  selectUserWithoutPassword: `SELECT username, email, user_id FROM client_users WHERE username = $1`,
  selectUserByUsernameAndPassword: `SELECT username, email, user_id FROM client_users WHERE username = $1 AND password = $2;`,
  selectCountOfUsers: `SELECT COUNT(*) as matching_count FROM client_users WHERE username=$1 AND email=$2;`,
  insertUser: `INSERT INTO client_users (username, email, password) VALUES ($1, $2, $3);`,
};

// curl -d "username=test1&password=test1&email=test1@test.com http://localhost:3001/v1/sign-up"
export const signUp = async (data: AuthSignUp) => {
  const selectUsersQuery = await query(queries.selectCountOfUsers, [
    data.username,
    data.email,
  ]);

  if (selectUsersQuery?.rows[0]?.matching_count > 0) {
    return { message: 'Username or Email already registered' };
  }

  const result = await query(queries.insertUser, [
    data.username,
    data.email,
    data.password,
  ]);

  if (result?.rows[0]) {
    return {
      data: result?.rows[0],
    };
  }
};

// curl -d "username=test1&password=test1 http://localhost:3001/v1/sign-in"
export const signIn = async ({ username, password }: AuthSignIn) => {
  const result = await query(queries.selectUserByUsernameAndPassword, [
    username,
    password,
  ]);

  if (result?.rowCount && result?.rowCount > 0) {
    return {
      data: result.rows[0],
    };
  }

  return { message: 'username or password incorrect' };
};
