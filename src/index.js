import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';

// import "core-js/features/string/repeat";
import assign from 'core-js/features/object/assign';
import 'core-js/features/string/virtual/replace-all';
//gridstack version@5.0.0
import 'gridstack/dist/gridstack-h5';
import 'jquery';
import 'gridstack/dist/gridstack.min.css';
//
import 'promise-polyfill/src/polyfill';
import 'unfetch/polyfill';
import 'abortcontroller-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';

import './styles/main.scss';
import App from './App';
// import { fetchUsers } from './features/LoginContainer/loginSlice'
import rootReducer from './reducers';

require('dotenv').config();

Object.assign = assign;

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});

// store.dispatch(fetchUsers())

const states = store.getState();
Cookies.set('headerTitleReducer', states.headerTitle, {
  secure: true,
  sameSite: 'strict',
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
