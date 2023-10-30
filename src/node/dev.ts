import { createServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';

export function createDevServer(root: string) {
  return createServer({
    root,
    // 引入我们写的插件
    plugins: [pluginIndexHtml(), pluginReact()]
  });
}
