import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div sx={{overflowY:'hidden'}}><App /></div>
  </React.StrictMode>,
)
