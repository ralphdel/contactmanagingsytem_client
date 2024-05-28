import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCubesStacked,
  FaAddressCard,
  FaRegAddressBook,
  FaPowerOff,
} from "react-icons/fa6";
import "../css/sidebar.css";

const SideBar = () => {

  /*const activelink =({isActive})=> isActive ? 'sidebar-link active': "sidebar-link"*/
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FaCubesStacked className="top-icon" />
      </div>
      <div className="sidebar-item">
        <NavLink
          to={"/dashboard/profile"}
        className={'sidebar-link'}
        >
          <FaUser className="icon" />
          Profile
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink
          to={"/dashboard"}
          className={'sidebar-link'} end
        >
          <FaAddressCard className="icon" /> Contacts
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink
          to={"/dashboard/add-contact"}
          className={'sidebar-link'}
        >
          <FaRegAddressBook className="icon" />
          Add Contacts
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink
          to={"/"}
          className={'sidebar-link'}
        >
          <FaPowerOff className="icon" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
