import { UserConfig as viteConfiguration } from 'vite';

export type NavItemWithLInk = {
  text: string;
  link: string;
};

export type SiderBarItem = {
  text: string;
  link: string;
};

export interface SiderBarGroup {
  text: string;
  items: SiderBarItem[];
}

export interface SiderBar {
  [path: string]: SiderBarGroup[];
}

export interface Footer {
  message: string;
}

export interface ThemeConfig {
  nav?: NavItemWithLInk[];
  sidebar?: SiderBar;
  footer?: Footer;
}

export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: viteConfiguration;
}

export interface SiteConfig {
  root: string;
  configPath: string;
  siteData: UserConfig;
}
