import { createServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';

export async function createDevServer(root: string) {
  console.log(root);

  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config);

  return createServer({
    root,
    // 引入我们写的插件
    plugins: [pluginIndexHtml(), pluginReact()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
