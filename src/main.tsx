import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './App'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster 
      position="top-right" 
      toastOptions={{
        duration: 1000,
        style: {
          background: '#5C3A1E',
          color: '#FDFAF6',
          fontFamily: '"DM Sans", sans-serif',
          borderRadius: '100px',
          padding: '12px 20px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#C49A6C',
            secondary: '#FDFAF6',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FDFAF6',
          },
        },
      }}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
