declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION_PORT: number,
      CONNECTION: string,
      QUERY_DATE_LIMIT: number,
      NODE_ENV: 'production' | 'development'
    }
  }
}

export {}