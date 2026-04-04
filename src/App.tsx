import { Layout } from "./components/Layout";
import { createBrowserRouter } from 'react-router-dom'
import { Home } from "./pages/Home";
import { CartPage } from "./pages/Cart";
import { AboutPage } from "./pages/About";



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cart',
        element: <CartPage/>
      }, 
      {
        path: '/sobre',
        element: <AboutPage/>
      }
    ]
  }
])

export { router };
