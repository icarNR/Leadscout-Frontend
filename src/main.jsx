import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import { SearchProvider } from "./components/admin/SearchContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <div sx={{overflowY:'hidden'}}><App /></div>
    </SearchProvider>
  </React.StrictMode>,
)
