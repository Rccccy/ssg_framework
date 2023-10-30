// 实现index.html 的响应插件 vite插件
import { Plugin } from "vite";
import { readFile } from "fs/promises";
import { DEFAULT_TEMPLATE_PATH, CLIENT_ENTRY_PATH } from "../constants";

export function pluginIndexHtml(): Plugin {
  return {
    name: "island:index-html",
    // 自动在html中引入script标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`, // /@fs/ 是vite的约定
            },
            injectTo: "body",
          },
        ],
      };
    },
    configureServer(server) {
      // 中间件逻辑是放在configureServer的返回函数中的，为什么？ 放到函数体内可能会影响vite内置中间件的返回逻辑，所以我门让这个中间件放在vite最后执行
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 1.读取template.html的内容
          let content = await readFile(DEFAULT_TEMPLATE_PATH, "utf-8");
          content = await server.transformIndexHtml(
            req.url,
            content,
            req.originalUrl
          );
          // 2.响应HTML浏览器
          res.setHeader("Content-Type", "text/html");
          res.end(content);
        });
      };
    },
  };
}
