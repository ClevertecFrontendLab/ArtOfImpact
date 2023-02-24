import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from "./redux/store"

import { MainPage } from './pages/main/main-page';
import { BookPage } from './pages/book/book-page';
import { Rule } from './pages/rule/rule';
import './index.css';
import { Contract } from './pages/contract/contract';
import { Layout } from './pages/layout/layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Navigate to="books/all" replace={true} />} />
          <Route path='books/:category' element={<MainPage />} />
          <Route path='books/:category/:bookId' element={<BookPage />} />
        </Route>
        {/* <Route path='/books/:category/:bookId' element={<BookPage />} /> */}
        <Route path='/Rule' element={<Rule />} />
        <Route path='/Contract' element={<Contract />} />
      </Routes>
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);
