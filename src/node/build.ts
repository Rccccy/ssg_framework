// ssg的构建代码
import { InlineConfig, build as viteBuild } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import type { RollupOutput } from 'rollup';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';

console.log('test commit');

export async function bundle(root: string) {
  try {
    const resolveViteConfig = (isServer: boolean): InlineConfig => {
      return {
        mode: 'production',
        root,
        build: {
          ssr: isServer,
          outDir: isServer ? '.temp' : 'build',
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
    const spinner = ora();
    spinner.start('building....');
    const clientBuild = async () => {
      return viteBuild(resolveViteConfig(false));
    };

    const serverBuild = async () => {
      return viteBuild(resolveViteConfig(true));
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
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const appHtml = render();
  // 找到构建的chunk
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
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

  //产物写到build目录下的index.html中
  await fs.writeFile(path.join(root, 'build', 'index.html'), html);
  await fs.remove(path.join(root, '.temp'));
}
export async function build(root: string) {
  // 1. bundle -client端 + server端
  const [clientBundle] = await bundle(root);

  // 2. 引入 server-entry模块
  const serverEntryPath = path.join(root, '.temp', 'ssr-entry.js');

  // 3. 服务度渲染，产出HTML

  const { render } = await import(serverEntryPath);
  await renderPage(render, root, clientBundle as RollupOutput);
}
