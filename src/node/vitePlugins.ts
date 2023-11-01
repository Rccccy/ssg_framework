import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { SiteConfig } from 'share/types';
import { createMdxPlugin } from './plugin-mdx';
import { Plugin } from 'vite';
export function createVitePlugins(
  config: SiteConfig,
  restart?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restart),
    pluginRoutes({ root: config.root }),
    createMdxPlugin()
  ] as Plugin[];
}
