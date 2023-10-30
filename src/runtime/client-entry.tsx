import { createRoot } from 'react-dom/client';
import { App } from '../runtime/App';

function renderInBrowser() {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root element not found');
  }
  createRoot(container).render(<App />);
}

renderInBrowser();
