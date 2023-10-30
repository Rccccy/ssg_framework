### CSR、SSR、SSG
1. CSR的概念和问题，没有HTML具体内容，依靠js的执行完成页面渲染
   - 首屏加载速度比较慢
   - 对SEO不友好，搜索引擎不会等你js执行完毕再爬取

2. SSR服务端返回完整的HTML内容
   - SSR页面无法进行交互事件的绑定
   - 解决方法： SSR页面加入CSR的脚本(同构)
   完成事件绑定----Hydration

3. SSG(Static Site Generation 静态站点生成)
   - 特征：构建阶段的SSR，build过程产出完整的HTML
   - 优点： 服务器压力小，继承SSR首屏性能及SEO的优势
   - 局限性： 不适合于数据经常变化的场景，适合文档站点、官网站点、博客等



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


### 入口HTML处理
1. 初始化主题组件
- React渲染层的接入
2. 支持组件热更新
- 实现局部热更新「文本改变，状态的值不变」使用vite官方的插件 
```shell
pnpm i @vitejs/plugin-react -S
```
