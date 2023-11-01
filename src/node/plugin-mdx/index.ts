import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';
import { pluginMdxHMR } from './remarkPlugins/pluginMdxHmr';

// Vite 热更新机制
// 1. 监听文件变动
// 2. 定位到热更新边界模块
// 3. 执行具体的更新逻辑
//  import.meta.hot.accept() 这个vite的API 覆盖了上述2，3 步骤

// 对于一个模块来说，谁接受他的更新，谁就是热更新的边界

export async function createMdxPlugin(): Promise<Plugin[]> {
  return [await pluginMdxRollup(), pluginMdxHMR()];
}
