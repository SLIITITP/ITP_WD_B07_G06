import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteSchedule() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schedules,setSchedules]= useState(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this schedule?");
    if (confirmed) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8070/schedule/schedule/delete/${id}`);
        setLoading(false);
        window.location="/admin/schedule";
      } catch (err) {
        setError(err.response.data.error);
      }
    }
    else{
      window.location="/admin/schedule";
    }
  };

  useEffect(()=>{
      const fetchSchedule = async()=>{

          try{
            
            const response = await axios.get(`http://localhost:8070/schedule/schedule/${id}`);
            setSchedules(response.data);

          }catch(err){
            console.log(err);
          }

      };
      fetchSchedule();
  },[id])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 style={{backgroundColor:"whitesmoke"}}>Deleting schedule</h2>
        
      
        {schedules &&(

            <div style={{backgroundColor:"lightblue"}}>
                  <div style={{backgroundColor:"gray"}}><super>Doctor Name:</super></div><div style={{border:"1px solid black"}}><p>{schedules.docName}</p></div>
                  <div style={{backgroundColor:"gray"}}><super>Materials URL:</super></div><div style={{border:"1px solid black"}}><p>{schedules.materials}</p></div>
                  <div style={{backgroundColor:"gray"}}><super>Videos URL:</super></div><div style={{border:"1px solid black"}}><p>{schedules.videos}</p></div>
                  <div style={{backgroundColor:"gray"}}><super>Events URL</super></div><div style={{border:"1px solid black"}}><p>{schedules.events}</p></div>
            
            </div>
        )}
      
    
      <button onClick={handleDelete}>Delete Schedule</button>
    </div>
  );
}
