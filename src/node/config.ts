import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite'; // 作用是读取配置文件的内容
import { UserConfig, SiteConfig } from '../share/types/index';

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => Promise<UserConfig> | UserConfig);

function getUserConfigPath(root: string) {
  try {
    const supportConfigFiles = ['config.ts', 'config.js'];
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.log('Failed to load user config');
    throw e;
  }
}

export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  // 1. 获取配置文件路径，支持js，ts格式
  const configPath = getUserConfigPath(root);
  // 2. 解析配置文件
  const result = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    // config 有三种形式 object、promise、function

    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);

    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'Island.js',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}
export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<SiteConfig> {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig: SiteConfig = {
    root,
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}

// 为配置文件增加类型提示
export function defineConfig(config: UserConfig): UserConfig {
  return config;
}
