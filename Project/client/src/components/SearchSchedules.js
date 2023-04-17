import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchSchedule() {
  const [id, setId] = useState("");
  const [schedule, setSchedule] = useState(null);

  async function fetchSchedule() {
    try {
      const response = await axios.get(`http://localhost:8070/schedule/schedule/${id}`);
      setSchedule(response.data);
    } catch (err) {
      console.error(err);
      setSchedule(null);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    if (id) {
      fetchSchedule();
    }
  }

  return (
    <div style={{backgroundColor:"#E4F4F3",height: "100vh",}}>
      <h1 style={{margin: '0 auto', textAlign: 'center',backgroundColor:""}}>Search Schedule</h1>
      <hr/> 
      <form onSubmit={handleSearch}>
        <div style={{backgroundColor:"#E4F4F3",fontSize:"30px", margin:"0 370px"}}>
        <label htmlFor="id-input" >Enter the Schedule ID:</label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="text" id="id-input" value={id} onChange={(event) => setId(event.target.value)} style={{ width: '50%', textAlign: 'center' }} />
        </div>
        <div style={{margin: '0 auto', textAlign: 'center',marginTop:"10px"}}>
        <button type="submit" >Search</button>
        </div>
      </form>
      {schedule && (
        <div>
          <h2>Schedule Details:</h2>
          <ul>
            <li>Doctor Name: {schedule.docName}</li>
            <li>Materials URL: {schedule.materials}</li>
            <li>Videos URL: {schedule.videos}</li>
            <li>Events URL: {schedule.events}</li>
          </ul>

          <div className="buttons">
          <button><Link to={`/update-schedule/${schedule._id}`}className="update button">
          Edit</Link></button>
          
          <button><Link to = {`/delete-schedule/${schedule._id}`}className="update button">
          Delete</Link> </button>
          </div>
        </div>
        
        
      
      )}
    </div>
  );
}
