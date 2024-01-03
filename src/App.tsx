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
  if (user) {
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
  return (
    <div>
      <h2 className='text-center mt-3'>Auctions</h2>
      <Routes>
        <Route path='/register' element={<AuthPage login={false} />} />
        <Route path='*' element={<AuthPage login />} />
      </Routes>
    </div>
  )
}

export default App;
