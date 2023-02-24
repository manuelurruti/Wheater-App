import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Card from './components/Card'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Card></Card>
  </React.StrictMode>,
)
