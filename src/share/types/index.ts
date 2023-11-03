import { ComponentType } from 'react';
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

export type PageType = 'home' | 'doc' | '404' | 'custom';

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
}

export interface Header {
  id: string;
  text: string;
  depth: number;
}

export interface PageData {
  siteData: UserConfig;
  pagePath: string;
  frontmatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
}

export interface PageModule {
  default: ComponentType;
  frontmatter: FrontMatter;
  toc?: Header[];
  [key: string]: unknown;
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
  // 增加 features 和 hero 的类型
  features?: Feature[];
  hero?: Hero;
}
