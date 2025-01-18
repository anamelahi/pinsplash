import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {CollectionProvider} from "./context/CollectionContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CollectionProvider>
    <App />
    </CollectionProvider>
  </StrictMode>,
)
