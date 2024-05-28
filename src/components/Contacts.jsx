import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const customStyles = {
  headCells: {
    style: {
      fontSize: 15 + "px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: 13 + "px",
      fontWeight: 500,
    },
  },
};

const MySwal = withReactContent(Swal)

const Contacts = () => {
  const [contacts, setContacts] = useState([]);


  const deleteContact=(id)=>{
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios
        .delete(`https://ralphcontactms-api.vercel.app/contactms/contact/${id}`, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setContacts(res.data.contacts);
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })
        .catch((err) => {
          MySwal.fire({
            title: "Err!",
            text: "Error Occured!!!",
            icon: "error"
          });
        }) 
      }
    });

  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            {" "}
            <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan className="table-icon2" onClick={()=>deleteContact(row._id)} />
        </>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("https://ralphcontactms-api.vercel.app/contactms/contacts", {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.contacts);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="contact-list">
      <DataTable
        columns={columns}
        data={contacts}
        customStyles={customStyles}
        pagination
      />
      {contacts.length === 0 && <h1>Add a Contact</h1>}
    </div>
  );
};

export default Contacts;

/*
Debbugging error 
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          console.error("Token not found");
          return;
        }

        console.log("Token:", token); // Log the token to ensure it is being retrieved correctly

        const response = await axios.get("http://localhost:5000/contactms/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data:", response.data); // Log the entire response data

        if (response.data.success) {
          setContacts(response.data.contacts);
          console.log("Contacts set successfully:", response.data.contacts);
        } else {
          setError("Failed to fetch contacts");
          console.error("Failed to fetch contacts:", response.data);
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        if (err.response) {
          console.error("Error response data:", err.response.data);
          setError(`Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          console.error("No response received from the server", err.request);
          setError("No response received from the server");
        } else {
          console.error("Error setting up request", err.message);
          setError("Error setting up request");
        }
        
      }
      
    };

    fetchContacts();
  }, []);
  */
