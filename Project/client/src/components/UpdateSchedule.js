import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateSchedule() {
  const {id} = useParams();
  const [schedule, setSchedule] = useState({
    docName: "",
    materials: "",
    videos: "",
    events: "",
  });

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`http://localhost:8070/schedule/schedule/${id}`);
        setSchedule(response.data);
  
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchSchedule();
  }, [id]);

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/schedule/schedule/update/${id}`,schedule);
      alert("Schedule updated successfully!");
      window.location = "/admin/schedule";
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) {
    return <div>No schedule found.</div>;
  }

  return (
    <div>
      <h2>Update Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor Name:</label>
          <input
            type="text"
            name="docName"
            value={schedule.docName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Materials URL:</label>
          <input
            type="url"
            name="materials"
            value={schedule.materials}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Videos URL:</label>
          <input
            type="url"
            name="videos"
            value={schedule.videos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Events URL:</label>
          <input
            type="url"
            name="events"
            value={schedule.events}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Schedule</button>
      </form>
    </div>
  );
}
