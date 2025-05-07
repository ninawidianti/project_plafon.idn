// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Daftarcafe from './components/Daftarcafe';
import Deskripsi from './components/Deskripsi';
import Masuk from './components/Masuk';
import Daftarcafe2 from './components/Daftarcafe2';
import Akun from './components/Akun';
import Editdata from './components/Editdata';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Daftarcafe" element={<Daftarcafe />} />
        <Route path="/deskripsi/:id" element={<Deskripsi />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/Daftarcafe2" element={<Daftarcafe2 />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/editdata" element={<Editdata />} />
      </Routes>
    </Router>
  );
}

export default App;
