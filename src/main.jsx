import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import { Provider } from './assets/Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider>
      <StrictMode>
        <App />
      </StrictMode>,
    </Provider>
  </BrowserRouter>
)
