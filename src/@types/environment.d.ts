declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      POSTGRES_USER: string;
      POSTGRES_DB: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      CREATE_TABLES: string;
    }
  }
}
export {};
