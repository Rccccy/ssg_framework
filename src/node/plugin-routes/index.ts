// 约定式路由vite插件
import { Plugin } from 'vite';
import { RouteService } from './RouteService';

interface PluginOptions {
  root: string;
  isSSR: boolean;
}

export const CONVENTIONAL_ROUTES_ID = 'island:routes';
export function pluginRoutes(options: PluginOptions): Plugin {
  const routerService = new RouteService(options.root);
  return {
    name: 'island:routes',
    configResolved() {
      routerService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTES_ID) {
        return '\0' + CONVENTIONAL_ROUTES_ID;
      }
    },
    load(id) {
      if (id === '\0' + CONVENTIONAL_ROUTES_ID) {
        return routerService.generateRoutesCode(options.isSSR || false);
      }
    }
  };
}
