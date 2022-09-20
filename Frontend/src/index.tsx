
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import store from './Redux/store';
import reportWebVitals from './reportWebVitals';
import interceptorsService from './Services/interceptorsService';


interceptorsService.createInterceptors()






ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
        <Layout />
        </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
