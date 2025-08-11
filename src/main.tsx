import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <ConfigProvider theme={{
      token: {
        fontFamily: "'Clash Grotesk', sans-serif"
      }
      }}>
      <App />
    </ConfigProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
