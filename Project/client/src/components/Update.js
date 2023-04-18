import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8070/ipayments/get/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8070/ipayments/update/${id}`, data)
      .then(() => window.location = '/view-payment')
      .catch((error) => console.log(error));
  };

  return (

    
    <div>
      <NavBar/>
         <div class="mb-3"></div>
      <center><h2>Edit Card details</h2></center>
      <form onSubmit={handleSubmit}>
        <div>
          <center><label htmlFor="Cholder">Card Holder Name:</label></center>
         <center> <input type="text"  required name="Cholder" value={data.Cholder} placeholder="Enter Card Holder" onChange={handleInputChange} /></center>
        </div>
        <div>
         <center> <label htmlFor="Cnumber">Card number:</label></center>
         <center> <input type="text"  required name="Cnumber" value={data.Cnumber || ''}  placeholder="Enter Card number"onChange={handleInputChange} /></center>
        </div>
        {/* <div>
         <center> <label htmlFor="date">date:</label></center>
         <center> <input type="Date" name="date" value={data.Date || ''} placeholder="Enter Your Expire date"onChange={handleInputChange} /></center>
        </div> */}
        <div>
         <center> <label htmlFor="cvv">cvv:</label></center>
         <center><input type="text"  required name="cvv" value={data.cvv || ''}  placeholder="Enter cvv Number"onChange={handleInputChange} /></center>
        </div>
        <center><button className="btn btn-danger"type="submit"> Edit</button></center>
      </form>
    </div>
  );
};

export default Update;

