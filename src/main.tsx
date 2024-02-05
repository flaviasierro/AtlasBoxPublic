import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PeopleRegister from './Components/PeopleRegister/PeopleRegister.tsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.tsx';
const router  = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageNotFound/>
  },
  {
    path: "/register",
    element: <PeopleRegister/>,
    
  },
  {
    path: "/tasks",
    element: <p>OPERADORES</p>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
