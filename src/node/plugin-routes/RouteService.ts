import fastGlob from 'fast-glob';
import path from 'path';
import { normalizePath } from 'vite'; //兼容windows 和mac

interface routeMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: routeMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  async init() {
    const files = fastGlob
      .sync(['**/*{js,jsx,tsx,ts,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/build/**', '**/.island/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      //路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }

  generateRoutesCode(ssr: boolean) {
    return `
    import React from 'react';
    ${ssr ? '' : 'import loadable from "@loadable/component";'}
    ${this.#routeData
      .map((route, index) => {
        return ssr
          ? `import Route${index} from '${route.absolutePath}'`
          : `const Route${index} = loadable(()=>import('${route.absolutePath}'))`;
      })
      .join('\n')}
      export const routes=[
        ${this.#routeData.map((route, index) => {
          return `{path: '${route.routePath}', element:React.createElement(Route${index}),preload:()=>import('${route.absolutePath}')}`;
        })}
      ]
    `;
  }

  getRouteMeta(): routeMeta[] {
    return this.#routeData;
  }

  normalizeRoutePath(raw: string) {
    const routesPath = raw.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routesPath.startsWith('/') ? routesPath : `/${routesPath}`;
  }
}
