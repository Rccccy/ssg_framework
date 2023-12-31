/// <reference types="vite/client" />
declare module 'island:site-data' {
  import type { UserConfig } from 'share/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'island:routes' {
  import { RouteObject } from 'react-router-dom';
  const routes: RouteObject[];
  export { routes };
}
