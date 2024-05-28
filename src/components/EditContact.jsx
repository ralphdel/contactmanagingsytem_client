import { useState , useEffect} from "react";
import "../css/form.css";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
  FaUserPlus,
} from "react-icons/fa6";

const EditContact = () => {
  const [forminput, setForminput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
const navigate = useNavigate();
  const {id}=useParams()
  

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
      .put("http://localhost:5000/contactms/update-contact/"+id, forminput, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success("Contact Updated Successfully", {
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/contactms/contact/"+id, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setForminput({
            name:res.data.contact.name,
            email:res.data.contact.email,
            phone:res.data.contact.phone,
            address:res.data.contact.address
          })
        }
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handlesubmit}>
        <h2>Edit contact</h2>
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
            value={forminput.phone}
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
            value={forminput.address}
            name="address"
            onChange={handleforminput}
          />
        </div>
        <button className="form-btn"> Update</button>
      </form>
    </div>
  );
};

export default EditContact;