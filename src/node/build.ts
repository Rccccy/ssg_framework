// ssg的构建代码
import { InlineConfig, build as viteBuild } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import type { RollupOutput } from 'rollup';
import path, { dirname, join } from 'path';
import fs from 'fs-extra';
// import ora from 'ora';
import { SiteConfig } from 'share/types';
import { createVitePlugins } from './vitePlugins';
import { RouteObject } from 'react-router-dom';

export async function bundle(root: string, config: SiteConfig) {
  try {
    const resolveViteConfig = async (
      isServer: boolean
    ): Promise<InlineConfig> => {
      return {
        mode: 'production',
        root,
        ssr: {
          noExternal: ['react-router-dom'] //将react-router-dom 这个包打包进我们的产物中，这样就不用去引入了第三方包了，解决了 第三方包中 cjs 不能直接引入esm的包
        },
        plugins: await createVitePlugins(config, undefined, isServer),
        build: {
          ssr: isServer,
          outDir: isServer ? '.temp' : path.join(root, 'build'),
          rollupOptions: {
            input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output: {
              format: isServer ? 'cjs' : 'esm'
            }
          }
        }
      };
    };
    // const { default: ora } = await dynamicImport("ora");
    // const spinner = ora();
    // spinner.start('building....');
    const clientBuild = async () => {
      return viteBuild(await resolveViteConfig(false));
    };

    const serverBuild = async () => {
      return viteBuild(await resolveViteConfig(true));
    };
    const [clientBundle, serverBundle] = await Promise.all([
      clientBuild(),
      serverBuild()
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: (pagePath: string) => string,
  root: string,
  clientBundle: RollupOutput,
  routes: RouteObject[]
) {
  // 找到构建的chunk
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  await Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const appHtml = render(routePath);
      const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          <div id="root">${appHtml}</div>    
          <script src="/${clientChunk.fileName}" type="module"></script>
      </body>
      </html>`.trim();
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
    })
  );

  await fs.remove(path.join(root, '.temp'));
}
export async function build(root: string, config: SiteConfig) {
  // 1. bundle -client端 + server端
  const [clientBundle] = await bundle(root, config);

  // 2. 引入 server-entry模块
  const serverEntryPath = path.join(root, '.temp', 'ssr-entry.js');

  // 3. 服务度渲染，产出HTML

  const { render, routes } = await import(serverEntryPath);
  await renderPage(render, root, clientBundle as RollupOutput, routes);
}
