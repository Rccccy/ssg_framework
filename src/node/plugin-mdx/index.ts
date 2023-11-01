import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';

export async function createMdxPlugin(): Promise<Plugin[]> {
  return [await pluginMdxRollup()];
}
