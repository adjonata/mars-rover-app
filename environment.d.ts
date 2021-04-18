declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION: string;
      NODE_ENV: "production" | "development";
      SECRET: string;
      NASA_API_KEY: string;
    }
  }
}

export {};
