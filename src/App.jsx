
import { RouterProvider} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import router from './Router'
import "react-toastify/dist/ReactToastify.css"
import { createContext, useEffect, useState } from 'react';
import axios from "axios";


export const Usercontext =createContext(null)

const App = () => {

const[user, setUser]=useState()

useEffect(()=>{
axios.get("https://ralphcontactms-api.vercel.app/contactms/verify",{
  headers:{
    Authorization: `Berear ${localStorage.getItem('token')}`
  }
} )
.then((res)=>{
 if (res.data.success) {
  setUser(res.data.user)
 }
}).catch((err)=>{
console.log(err);
})
},[])
  return (
    <>
   <ToastContainer/>
   <Usercontext.Provider value={{user, setUser}}>
   <RouterProvider router={router}/>
   </Usercontext.Provider>
   
   </>
  )
}

export default App