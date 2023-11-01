import { createServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root: string,
  restart: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');

  return createServer({
    root: PACKAGE_ROOT,
    // 引入我们写的插件
    plugins: createVitePlugins(config, restart),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
