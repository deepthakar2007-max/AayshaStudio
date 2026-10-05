import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Addcustomer() {

  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
   address: "",
  });

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(customer);

      const response = await fetch(
        "http://localhost:4000/api/customers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),

        }
      );

      const result = await response.json();
 
      console.log(result);

      alert("Customer Added Successfully");

      setCustomer({
        name: "",
        Phone: "",
        email: "",
        address: "",
      });
        
      navigate("/Customer");
   
    } catch (error) {
      console.log(error.students);
      alert("Something went wrong");
    }
  }


  return (
    <div className="form-container">
      <h1>Add Customer</h1>

      <form onSubmit={handleSubmit}>

        <label>Customer Name:-</label>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Enter Customer Name"
          required
        />
        <input
         type="number"
         name="phone"
         value={customer.phone}
         onChange={handleChange}
         placeholder="Enter Phone Number"
         required
          />

        <label>Customer Email:-</label>
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Enter Customer Email"
          required
        />
        <label>Customer Address:-</label>
        <input
          type="text"
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Enter Customer Address"
          required
        />

      
        

        <button type="submit">
          Add Customer
        </button>

      </form>
    </div>
  );
}

export default Addcustomer;