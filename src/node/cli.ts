import cac from 'cac';
// import { createDevServer } from './dev';
import { build } from './build';
import { resolve } from 'path';
import { resolveConfig } from './config';
const cli = cac('island').version('0.0.1').help();

// cac 注册命令
cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const createServer = async () => {
    const { createDevServer } = await import('./dev.js');
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer();
});

cli.command('build [root]', 'build production').action(async (root: string) => {
  try {
    root = resolve(root);
    const config = await resolveConfig(root, 'build', 'production');
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});

//cac 解析参数
cli.parse();
