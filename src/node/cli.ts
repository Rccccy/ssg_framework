import cac from "cac";
import { createDevServer } from "./dev";
const cli = cac("island").version("0.0.1").help();

// cac 注册命令
cli.command("dev [root]", "start dev server").action(async (root: string) => {
  const server= await createDevServer(root);
  await server.listen()
  server.printUrls();
});

cli.command('build [root]', 'build production').action(async (root: string) => {
  console.log("build", root);
});

//cac 解析参数 
cli.parse();
