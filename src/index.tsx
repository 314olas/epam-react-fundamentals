import React from "react"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import {App} from "./components/App";
import {store} from "./store/store"
import './styles/main.scss'


const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>

)


