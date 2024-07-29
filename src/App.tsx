import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Top from './components/Top';
import Log from './components/Log';

function App() {
  return (
    <BrowserRouter basename="/lbol-logs">
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/:ver/' element={<Top />} />
        <Route path='/:ver/:id/' element={<Log />} />
      </Routes>
      <Link to='/'>Back To Top</Link>
    </BrowserRouter>
  );
}

export default App;
