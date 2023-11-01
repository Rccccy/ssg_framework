import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

export const options: VitePluginConfig = {
  presets: [presetAttributify, presetWind, presetIcons]
};
