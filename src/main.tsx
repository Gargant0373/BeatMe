import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Beater from './Beater'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Beater />
  </StrictMode>,
)
