import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import CustomScrollbar from './components/general/CustomScrollbar.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomScrollbar style={{ height: "100vh" }}>
    <App />
    </CustomScrollbar>
  </StrictMode>,
)
