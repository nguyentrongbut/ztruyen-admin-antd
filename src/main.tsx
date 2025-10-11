// ** React
import { StrictMode } from 'react'

// ** React dom
import { createRoot } from 'react-dom/client'

// ** App
import App from "@/App.tsx";

// ** i18n
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
