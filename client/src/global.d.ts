declare module "*.svg" {
  const content: any;
  export default content;
}

declare namespace NodeJS {
	export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    WEB_SOCKET_HOST: string;
  }
}
