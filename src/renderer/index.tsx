import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/index.scss';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
