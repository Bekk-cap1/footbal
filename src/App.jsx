import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Referee from './pages/Referee'
import NotFound from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import Coach__list from './pages/Coach__list'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home/>} />
          <Route path='/participants/referee' element={<Referee />} />
          <Route path='/participants/coach-list' element={<Coach__list />} />

        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
