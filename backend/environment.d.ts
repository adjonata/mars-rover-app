import winston from "winston";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION_PORT: number,
      CONNECTION: string,
      NODE_ENV: 'production' | 'development'
    }
  }
}

declare const winston: winston.Winston;
export = winston;

export {}