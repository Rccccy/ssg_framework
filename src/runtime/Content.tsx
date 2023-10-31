import A from '../../docs/guide/A';
import B from '../../docs/guide/B';

import Index from '../../docs/guide/index';

import { useRoutes } from 'react-router-dom';
const routes = [
  {
    path: '/guide',
    element: <Index />
  },
  {
    path: '/guide/a',
    element: <A />
  },
  {
    path: '/b',
    element: <B />
  }
];

export const Content = () => {
  const rootElement = useRoutes(routes);
  return rootElement;
};
