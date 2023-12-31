// 处理常量逻辑

import path from 'path';
export const PACKAGE_ROOT = path.join(__dirname, '..');

export const MASK_SPLITTER = '!!ISLAND!!';

export const DEFAULT_TEMPLATE_PATH = path.join(PACKAGE_ROOT, 'template.html');

export const CLIENT_ENTRY_PATH = path.join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'client-entry.tsx'
);

export const SERVER_ENTRY_PATH = path.join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'ssr-entry.tsx'
);

export const EXTERNALS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime'
];
