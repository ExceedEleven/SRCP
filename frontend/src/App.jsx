import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Park1 from './pages/Park1';
import Park2 from './pages/Park2';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/park1" element={<Park1 />} />
          <Route path="/park2" element={<Park2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
