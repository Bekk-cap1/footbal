import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  )
}

export default App
