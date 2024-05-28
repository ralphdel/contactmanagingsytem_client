import  { useState } from "react";
import "../css/form.css";
import { Link, useNavigate} from "react-router-dom";
import { Validation } from "../components/Validation";
import axios from "axios";
import { toast } from "react-toastify";


const SignUp = () => {
  const [forminput, setForminput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [servererror, setServererror] = useState([]);
  const navigate =useNavigate()

  const handleforminput = (e) => {
    const { name, value } = e.target;
    setForminput({
      ...forminput,
      [name]: value,
    });
  };

 

  const handlesubmit = (e) => {
    e.preventDefault();
    const err = Validation(forminput);
    setErrors(err);
    if (err.name === "" && err.email === "" && err.password === "") {
      axios
        .post("https://ralphcontactms-api.vercel.app/contactms/signup", forminput)
        .then((res) => {
          if (res.data.success) {
            toast.success("Account created Successfully", {
              position: "top-right",
              autoClose: 5000,
            })
            navigate("/login")
          }
         
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServererror(err.response.data.errors);
          } else {
            console.log(err);
          }
      
        });
    }

   
    // setForminput({
    //   name:'',
    //   email:'',
    //   password:''
    // })
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handlesubmit}>
        <h2>Create an Accout</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            name="name"
            value={forminput.name}
            onChange={handleforminput}
          />
          {errors.name && <span className="errors"> {errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={forminput.email}
            name="email"
            onChange={handleforminput}
          />
          {errors.email && <span className="errors"> {errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={forminput.password}
            name="password"
            onChange={handleforminput}
          />
          {errors.password && (
            <span className="errors"> {errors.password}</span>
          )}
        </div>
        {servererror.length > 0 &&
          servererror.map((error, index) => {
           return <p key={index} className="errors">
              {error.value}:{error.msg}
            </p>
            
          })}
        <button className="form-btn"> SignUp</button>
        <p>
          {" "}
          Already have an account? <Link to={"/Login"}> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
