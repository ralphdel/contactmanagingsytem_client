import NavBar from "../components/NavBar"
import {Outlet} from 'react-router-dom'
import "../css/dashboard.css"
import SideBar from "../components/SideBar"

const Dashboard = () => {
  return (
   <>
    <NavBar/>
    <div className="dashboard">
      <div className="sidebar-container">
       <SideBar/>
      </div>
      <div className="outlet">
       <Outlet/>
      </div>
    </div>
   </>
  )
}

export default Dashboard