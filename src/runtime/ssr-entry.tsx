// 服务端入口文件
import { App } from './App';
import { renderToString } from 'react-dom/server';

//这样可以拿到组件的HTML字符串
export function render() {
  return renderToString(<App />);
}
