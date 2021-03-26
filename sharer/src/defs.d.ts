declare module 'dos-config' {
  interface TwitterConfig {
    consumer: {
      key: string;
      secret: string;
    },
    access_token: {
      key: string;
      secret: string;
    }
  }

  const config: TwitterConfig;
  export default config;
}