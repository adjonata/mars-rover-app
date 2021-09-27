declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION: string;
      SECRET: string;
      NASA_API_KEY: string;
      ROVER: string;
      ENABLE_REGISTRATION: boolean;
    }
  }
}

export {};
