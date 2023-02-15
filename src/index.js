import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from "./redux/store.js"

import { MainPage } from './pages/main/main-page';
import { BookPage } from './pages/book/book-page';
import { Rule } from './pages/rule/rule';

import './index.css';
import { Contract } from './pages/contract/contract';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/books/all/:bookId' element={<BookPage />} />
        <Route path='/Rule' element={<Rule />} />
        <Route path='/Contract' element={<Contract />} />
      </Routes>
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);
