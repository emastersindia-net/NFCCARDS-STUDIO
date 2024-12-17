import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/fonts.css'
import './style.css'
import { Provider } from 'react-redux'
import store from './utils/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)