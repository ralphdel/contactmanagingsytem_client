import {createBrowserRouter} from 'react-router-dom'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard';
import Contacts from './components/Contacts';
import Addcontact from './components/Addcontact';
import EditContact from './components/EditContact';



const router =createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>,
    children:[
      { 
        index:true,
        element:<Contacts/>
      },
      {
        path:'/dashboard/add-contact',
        element: <Addcontact/>
      },
      {
        path:'/dashboard/edit-contact/:id',
        element: <EditContact/>
      }
    ]
  }
])

export default router