import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// EMG - We do not need the serviceWorker
// import * as serviceWorker from './serviceWorker';
// EMG - We want to create our store at index.js, and wrap our App inside of the Provider component.
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
// EMG - We make sure that our store is aware of our middleware
import middleware from './middleware'

// EMG - We call createStore passing it our root reducer
const store = createStore(reducer, middleware)

console.log('Index.js')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// EMG - We do not need the serviceWorker
//serviceWorker.unregister();
