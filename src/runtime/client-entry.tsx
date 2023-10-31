import { createRoot } from 'react-dom/client';
import { App } from '../runtime/App';
import siteData from 'island:site-data';

import { BrowserRouter } from 'react-router-dom';

function renderInBrowser() {
  console.log(siteData);

  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root element not found');
  }
  createRoot(container).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

renderInBrowser();
