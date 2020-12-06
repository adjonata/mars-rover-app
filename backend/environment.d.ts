declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION_PORT: number,
      CONNECTION: string,
      NODE_ENV: 'production' | 'development'
    }
  }
}

export {}