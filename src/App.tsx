import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '', element: <Home /> },
      { path: '/tv', element: <Tv /> },
      { path: '/search', element: <Search /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
