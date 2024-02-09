import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutOne from './Layout/LayoutOne.jsx'
import AddTask from './Pages/AddTask/AddTask.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.jsx'
import Homepage from './Pages/Homepage/Homepage.jsx'
import ViewTask from './Pages/ViewTask/ViewTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne />,
    errorElement: '',
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/add-task',
        element: <AddTask />
      },
      {
        path: '/view-task',
        element: <ViewTask />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
