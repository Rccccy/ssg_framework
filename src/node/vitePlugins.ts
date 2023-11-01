import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { SiteConfig } from 'share/types';
import { createMdxPlugin } from './plugin-mdx';
import { Plugin } from 'vite';
import PluginUnocss from 'unocss/vite';
import { options as VitePluginConfig } from './unocssOptions';
export async function createVitePlugins(
  config: SiteConfig,
  restart?: () => Promise<void>,
  isSSR = false
) {
  return [
    PluginUnocss(VitePluginConfig),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restart),
    pluginRoutes({ root: config.root, isSSR }),
    await createMdxPlugin()
  ] as Plugin[];
}
