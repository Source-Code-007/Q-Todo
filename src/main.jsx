import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutOne from './Layout/LayoutOne.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne/>,
    errorElement: '',
    children: [
      {
        path: '/',
        element: <h2>hey</h2>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
