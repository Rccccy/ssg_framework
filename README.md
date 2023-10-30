### 什么是MVP版本
> MVP: 开发最小可用版本(Minimum Viable Product) 要实现以下能力
1. cli脚手架搭建
2. 基于vite的DevServer
3. 项目基本目录结构搭建
4. React主题组件的前端渲染
5. 服务端渲染，产出HTML

### CLI脚手架搭建
1. 信息展示，如vite -help、vite -version
2. 子命令分发，如vite serve、 vite build
3. 参数解析，如vite -port=8080
4. 信息交互，如实现多选框、输入框

技术选型：使用CAC 实现「vite内置」

如何注册调试cli工具？
1. 需要在package.json 文件中声明bin字段 「node 的执行文件」
2. 需要通过 npm link 将命令注册到全局
3. 在命令行中 使用命令来调试

### Dev Server搭建
>什么是Dev Server: 开发阶段的服务器；本质上就是一个node.js 开发的HTTP Server；作用是用来进行资源编译「编译ts，jsx等」、模块热更新、静态资源服务等。 如webpack-dev-server/Vite

使用vite实现Dev Server，原因是项目基于vite搭建，Vite Dev Server 拥有完整的中间件机制易于扩展