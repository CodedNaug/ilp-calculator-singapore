import { createRoot } from 'react-dom/client'
import './index.css'
import ILPTruthPage from './pages/ILPTruthPage'
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./theme/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import './theme-flip.css';

const root = createRoot(document.getElementById('root')!)
root.render(<ILPTruthPage />)


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <ThemeToggle />
            <ILPTruthPage />
        </ThemeProvider>
    </React.StrictMode>
);