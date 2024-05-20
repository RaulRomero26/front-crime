import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Importa el store desde la carpeta store

import './index.css'
import { TanStackProvider } from './plugins/TanStackProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanStackProvider>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </TanStackProvider>
  </React.StrictMode>,
)
