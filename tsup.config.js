import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/node/cli.ts'],
  bundle: true,
  splitting: true, //开启拆包的功能
  outDir: 'dist',
  format: ['cjs', 'esm'], //输出格式
  dts: true,
  shims: true, // 对esm和cjs 的api进行polyfill 的代码导入
  banner: {
    js: 'import { createRequire as createRequire0 } from "module"; const require = createRequire0(import.meta.url);'
  } //这段代码 当构建输出的JavaScript文件时，这个字符串会被添加到文件的开头。这个配置项常用于添加版权信息、许可证信息或者其他自定义的注释
});
