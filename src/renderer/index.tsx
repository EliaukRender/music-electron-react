import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
