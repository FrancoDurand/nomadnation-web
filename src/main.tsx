import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider disableGlobalStyle={true} /* resetCSS={false} */ >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
