import { Layout } from "./components/Layout";
import { createBrowserRouter } from 'react-router-dom'
import { Home } from "./pages/Home";



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home/>
      }
    ]
  }
])

export { router };
