import winston from "winston";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION_PORT: number,
      CONNECTION: string,
      NODE_ENV: 'production' | 'development',
      SECRET: string
    }
  }
}

declare const winston: winston.Winston;
export = winston;

export {}