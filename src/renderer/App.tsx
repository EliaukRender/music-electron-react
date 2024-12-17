import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function HOME() {
  return <div>HOME</div>;
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
