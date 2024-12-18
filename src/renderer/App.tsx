import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './views/Home';
import { AppStyles } from '@/renderer/AppStyles';

export default function App() {
  return (
    <AppStyles>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AppStyles>
  );
}
