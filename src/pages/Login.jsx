import { useState } from "react";
import "../css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../components/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Usercontext } from "../App";



const Login = () => {
  const [forminput, setForminput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [servererror, setServererror] = useState([]);
  const {user, setUser}= useContext(Usercontext);
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
    const err = Validation(forminput);
    setErrors(err);
    if (err.email === "" && err.password === "") {
      axios
        .post("https://ralphcontactms-api.vercel.app/contactms/login", forminput)
        .then((res) => {
          if (res.data.success) {
            toast.success("Login Successful", {
              position: "top-right",
              autoClose: 5000,
            });

            console.log(res);
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user)
            navigate("/dashboard");
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
        <h2>Login</h2>
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
            return (
              <p key={index} className="errors">
                {error.value}:{error.msg}
              </p>
            );
          })}
        <button className="form-btn"> Log In</button>
        <p>
          {" "}
          Don't have an account yet? <Link to={"/signup"}> Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
