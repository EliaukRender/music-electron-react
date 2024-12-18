import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './views/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
