import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'configs/i18next';
import Top from 'components/top';
import Log from 'components/log';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Top />,
        children: [
          {
            path: ':ver/',
            element: <Top />,
            children: [
              {
                path: ':id/',
                element: <Log />,
              }
            ]
          },
        ]
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
];
const router = createBrowserRouter(routes, { basename: '/lbol-logs' });

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
