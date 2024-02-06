import React from 'react';
import './App.css';
import { useAuthContext } from './context/AuthContext';
import { Route, Routes } from 'react-router';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import AuctionsPage from './components/AuctionsPage';
import UserAuctionPage from './components/user/UserAuctionPage';
import AuctionShowPage from './components/user/AuctionShowPage';
import UserAuctionHistoryPage from './components/user/UserAuctionHistoryPage';
import StatisticsPage from './components/StatisticsPage';

function App() {
  const { user } = useAuthContext();
  if (user?.admin) {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/auction/:id' element={<AuctionShowPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='*' element={<AuctionsPage />} />
        </Routes>
      </div>
    )
  }
  if (user) {
    return <div>
      <Navbar />
      <Routes>
        <Route path='/auction/:id' element={<AuctionShowPage />} />
        <Route path='/history' element={<UserAuctionHistoryPage />} />
        <Route path='*' element={<UserAuctionPage />} />
      </Routes>
    </div>
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<UserAuctionPage />} />
        <Route path='/auction/:id' element={<AuctionShowPage />} />
        <Route path='/register' element={<AuthPage login={false} />} />
        <Route path='/login' element={<AuthPage login />} />
      </Routes>
    </div>
  )
}

export default App;
