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
import { LayoutAuthorization } from './pages/authorization/authorization';
import { Entrance } from './pages/entrance/entrance';
import { Recovery } from './pages/recovery/recovery';
import { RequireAuth } from './pages/http/requier-auth';
import { RequireToken } from './pages/http/requier-token';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<Navigate to="books/all" replace={true} />} />
            <Route path='books/:category' element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            } />
            <Route path='books/:category/:bookId' element={
              <RequireAuth>
                <BookPage />
              </RequireAuth>
            } />
          </Route>
          <Route path='/registration' element={
            <RequireToken>
              <LayoutAuthorization />
            </RequireToken>
          } />
          <Route path='/auth' element={
            <RequireToken>
              <Entrance />
            </RequireToken>
          } />
          <Route path='/forgot-pass' element={
            <RequireToken>
              <Recovery />
            </RequireToken>
          } />
          <Route path='/Rule' element={<Rule />} />
          <Route path='/Contract' element={<Contract />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
