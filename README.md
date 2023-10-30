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

### SSG核心流程
**组件的代码既需要运行在客户端，又需要运行在服务端** 创建服务端组件入口 'src/runtime/ssr-entry.tsx'


### 搭建开发工作流
1. 接入库构建工具 tsup
   - 对模块格式的思考 esm/cjs
   - 为什么cjs 不能直接引入esm的包呢？「esm可以正常引入cjs的包」
>根本原因：模块加载机制  cjs是同步加载，require方法是同步执行的代码；esm中的代码都是异步加载的代码，所以在cjs的代码中使用 async和await import('/xx.js') 可以正常使用； 我们得使用其他方法绕开import的编译；(tsc的编译不会帮我们处理这样的情况，这就是tsc的局限性)

**我们在写第三方库的时候，尽可能将cjs和mjs都暴露出去，避免出现这种情况**
```ts
// 临时的解决方法
const dynamicImport = new Function('m','return import('m')')
将import方法 换成 dynamicImport方法
```

社区中的库构建方案：
1. vite/rollup -----> 底层使用Rollup 打包
2. tsup ------> 基于ESbuild打包，对于ESbuild的软肋 无法生成 ts类型的问题，使用rollup + rollup-plugin-dts 来进行类型的打包
3. unbuild ------> 原理痛tsup，另外包含 bundleless模式(类似tsc对单个文件进行编译)

tsup 
### 集成代码规范工具链
1. 集成Eslint、Prettier、Husky、Commitlint 等工具链
```shell
pnpm i eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```
**eslint 用来统一代码规则，进行代码风格修复建议使用prettier**
```shell
pnpm i prettier eslint-plugin-prettier eslint-config-prettier
```

2. 
- 安装husky 命令 npx husky install 生成 .husky文件夹  使用下面命令添加钩子
```shell
npx husky add .husky/pre-commit "pnpm run lint" 
```
- package.json中添加脚本 "prepare": "husky install", npm 安装依赖的时候自动执行脚本

- 配置commit信息的检查
```shell
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

```shell
npx husky add .husky/pre-commit "npx --no-install commitlint --edit "$1""
```


### 搭建单元测试/E2E 测试环境