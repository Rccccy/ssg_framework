import { createRoot } from 'react-dom/client';
import { App, initPageData } from '../runtime/App';
// import siteData from 'island:site-data';
import { DataContext } from './hooks';
import { BrowserRouter } from 'react-router-dom';

async function renderInBrowser() {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root element not found');
  }
  const pageData = await initPageData(location.pathname);
  createRoot(container).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  );
}

renderInBrowser();
