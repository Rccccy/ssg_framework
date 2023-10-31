import { join, relative } from 'path';
import { SiteConfig } from 'share/types';
import { Plugin } from 'vite';
import { PACKAGE_ROOT } from '../constants/index';

const SITE_DATA_ID = 'island:site-data';
export function pluginConfig(
  config: SiteConfig,
  restart?: () => Promise<void>
): Plugin {
  // let server: ViteDevServer | null = null;
  return {
    name: 'island:site-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
      return {
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        }
      };
    },
    // configureServer(s) {
    //   server = s;
    // },

    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id: string) => {
        return customWatchedFiles.some((file) => id.includes(file));
      };
      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed,restarting server...`
        );
        // 重启Dev Server
        // 方案讨论:
        // 1. 插件内重启Vite 的dev server
        // await server.restart(); //此方法无效，因为没有记性island 框架配置的重新读取
        // 2.手动调用dev.ts中的 createServer
        await restart();
      }
    }
  };
}
