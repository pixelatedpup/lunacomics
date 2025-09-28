import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.tsx'
import './index.css'
import App from './App.tsx'
import { NotificationProvider } from './context/NotificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <NotificationProvider>
      <App />
      </NotificationProvider>
    </UserProvider>
  </StrictMode>,
)
