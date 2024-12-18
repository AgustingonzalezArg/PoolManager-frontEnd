import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './private/pages/HomePage.tsx'
import { Clients } from './private/pages/Clients.tsx'
import { User } from './private/pages/User.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <div>La pagina dio error</div>,
  children: [{
    path: "",
    element: <HomePage />
  },
  {
    path: "clients",
    element: <Clients />
  },
  {
    path: "user",
    element: <User />
  }
]
}])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
