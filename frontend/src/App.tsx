import React from 'react';
import './App.css';
import { useAuthContext } from './context/AuthContext';
import { Route, Routes } from 'react-router';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import AuctionsPage from './components/AuctionsPage';

function App() {
  const { user } = useAuthContext();
  if (user?.admin) {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/products' element={<ProductsPage />} />
          <Route path='*' element={<AuctionsPage />} />
        </Routes>
      </div>
    )
  }
  if (user) {
    <div>
      <Navbar />
      <Routes>
        <Route path='/auction/:id' element={<div>Auction</div>} />
        <Route path='/history' element={<div>History</div>} />
        <Route path='*' element={<AuctionsPage />} />
      </Routes>
    </div>
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<AuctionsPage />} />
        <Route path='/auction/:id' element={<div>Auction</div>} />
        <Route path='/register' element={<AuthPage login={false} />} />
        <Route path='/login' element={<AuthPage login />} />
      </Routes>
    </div>
  )
}

export default App;
