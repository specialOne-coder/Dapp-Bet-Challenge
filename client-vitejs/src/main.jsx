import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/styles/index.css'
import { AppProvider } from './context/AppContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
