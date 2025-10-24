// import './App.css'
import "./index.css"
import '@solana/wallet-adapter-react-ui/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Leaderboard } from './pages/Leaderboard';
import WalletContextProvider from './components/WalletProvider';
import { Toaster } from 'sonner';

function App() {

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
