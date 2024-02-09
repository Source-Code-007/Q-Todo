import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutOne from './Layout/LayoutOne.jsx'
import AddTask from './Pages/AddTask/AddTask.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne />,
    errorElement: '',
    children: [
      {
        path: '/',
        element: <h2>hey</h2>
      },
      {
        path: '/add-task',
        element: <AddTask />
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
