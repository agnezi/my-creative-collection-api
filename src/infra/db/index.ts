import { Client, DatabaseError, QueryResult } from 'pg';

export const query = async (
  text: string,
  params?: any,
  callback?: (err: Error, result: QueryResult<any>) => void,
) => {
  const dbClient = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  try {
    await dbClient.connect();
    const start = Date.now();
    const res = await dbClient.query(text, params);
    const duration = Date.now() - start;
    
    console.log('EXECUTED query', { text, duration, rows: res.rowCount });

    return res;
  } catch (err) {
    const databaseError = err as DatabaseError;
    
    console.log('ERROR query', { text });
    console.log(databaseError);
    
    throw new Error(databaseError.message);
  } finally {
    await dbClient.end();
  }
};
