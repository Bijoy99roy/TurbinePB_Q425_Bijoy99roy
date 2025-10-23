import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import "./index.css"
import '@solana/wallet-adapter-react-ui/styles.css';
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Leaderboard } from './pages/Leaderboard';
import WalletContextProvider from './components/WalletProvider';
import { Toaster } from 'sonner';

function App() {
  const [count, setCount] = useState(0)

  return (
    <WalletContextProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  )
}

export default App
