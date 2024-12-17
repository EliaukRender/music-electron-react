import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import windowUIEmitter from './ipcRenderer/windowUIEmitter';

function HOME() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          windowUIEmitter.maxApp();
        }}
      >
        max
      </button>
      <button
        onClick={() => {
          windowUIEmitter.minApp();
        }}
      >
        min
      </button>
      <button
        onClick={() => {
          windowUIEmitter.fullApp();
        }}
      >
        full
      </button>
      <div style={{ fontSize: '100px' }}>music</div>
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
