// ** React
import { StrictMode } from 'react'

// ** React dom
import { createRoot } from 'react-dom/client'

// ** App
import App from "@/App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
