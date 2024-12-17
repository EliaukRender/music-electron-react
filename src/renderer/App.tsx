import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { maxAppWindow } from './ipcRenderer/windowMessage';

function HOME() {
  return (
    <div>
      <button
        onClick={() => {
          maxAppWindow();
        }}
      >
        max app
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HOME />} />
      </Routes>
    </Router>
  );
}
