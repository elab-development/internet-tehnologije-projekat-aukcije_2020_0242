import React from 'react';
import './App.css';
import { useAuthContext } from './context/AuthContext';
import { Route, Routes } from 'react-router';
import AuthPage from './components/AuthPage';

function App() {
  const { user } = useAuthContext();
  if (user) {
    return null;
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
