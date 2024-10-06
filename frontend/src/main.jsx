import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { appRoute } from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={appRoute}/>
  </StrictMode>,
)
