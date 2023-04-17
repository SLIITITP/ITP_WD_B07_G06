import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetSchedules = () => {
  const [schedules, setSchedules] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/schedule/schedule`);
        console.log(response);
        if (response.status === 200) {
          setSchedules(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchedules();
  }, []);

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard');
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/schedule/schedule/`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Schedule Details.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{backgroundColor:"#37BEB0"}}>
      <div>
      <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {window.location.replace("/admin/schedule")}}
            >View
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {window.location.replace("/admin/search-schedule")}}
            >
             Search
            </button>
      </div>
      <h1 style={{margin: '0 auto', textAlign: 'center'}}>All schedules</h1>
      <table>
      <thead>
      <tr>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>userID</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Doctor Name</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Reading Materials</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Videos</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Events</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Schedule ID</th>
        <th style={{border: "1px solid lightgray", padding: "5px"}}>Actions</th>
      </tr>
    </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule) => (
              <tr key={schedule._id} style={{border: "1px solid lightgray"}}>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule.userID}</td>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule.docName}</td>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule.materials}</td>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule.videos}</td>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule.events}</td>
            <td style={{border: "1px solid lightgray", padding: "5px"}}>{schedule._id}</td>    
            <td style={{display: 'flex', gap: '10px', border: "1px solid lightgray", padding: "5px"}}>

            <button style={{backgroundColor:"#94C973"}} onClick={() => copyToClipboard(schedule._id)}>
              Copy
            </button>
              <button style={{backgroundColor:"#94C973"}}>
                  <Link to={`/update-schedule/${schedule._id}`} className="update buttonC">
                Edit
                </Link>
              </button>
              
                  <button style={{backgroundColor:"#94C973"}}><Link to={`/delete-schedule/${schedule._id}`} className="update buttonC">Delete </Link></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button  style={{backgroundColor:"#94C973"}} onClick={handleDownload}>Download</button>
    </div>
  );
};

export default GetSchedules;
