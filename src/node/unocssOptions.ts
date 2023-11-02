import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

export const options: VitePluginConfig = {
  presets: [presetAttributify, presetWind, presetIcons],
  rules: [
    [
      /^divider-(\w)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--island-c-divider-light)'
      })
    ]
  ]
};
