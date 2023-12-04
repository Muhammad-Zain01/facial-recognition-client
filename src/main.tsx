import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './index.css'
import { WebcamProvider } from './context/webcam.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#0766AD', borderRadius: 4 } }}>
        <WebcamProvider>
          <App />
        </WebcamProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
