import React from "react"
import { createRoot } from 'react-dom/client';
import {App} from "./components/App";
import AppState from "./components/context/AppContext";
import './styles/main.scss'

const root = createRoot(document.getElementById('root'))
root.render( <AppState>
    <App />
</AppState>

)


