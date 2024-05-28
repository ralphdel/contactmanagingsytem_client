import { useState } from "react";
import "../css/form.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
  FaUserPlus,
} from "react-icons/fa6";

const Addcontact = () => {
  const [forminput, setForminput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleforminput = (e) => {
    const { name, value } = e.target;
    setForminput({
      ...forminput,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/contactms/add-contact", forminput, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handlesubmit}>
        <h2>Add new contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            name="name"
            value={forminput.name}
            onChange={handleforminput}
          />
        </div>
        <div className="form-group">
          <FaAt />
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={forminput.email}
            name="email"
            onChange={handleforminput}
          />
        </div>
        <div className="form-group">
          <FaPhoneFlip />
          <input
            type="text"
            placeholder="Enter phone Number"
            className="form-control"
            value={forminput.password}
            name="phone"
            onChange={handleforminput}
          />
        </div>
        <div className="form-group">
          <FaRegAddressCard />
          <input
            type="text"
            placeholder="Enter Address"
            className="form-control"
            value={forminput.password}
            name="address"
            onChange={handleforminput}
          />
        </div>
        <button className="form-btn"> Create contact</button>
      </form>
    </div>
  );
};

export default Addcontact;
