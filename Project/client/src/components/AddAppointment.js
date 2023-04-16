import React, {useState} from "react"
import "../styles/AppointmentStyle.css";
import axios from "axios";
import NavBar from "./NavBar";


export default function AddAppointment(){

    const [pname, setPname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dname, setDname] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function sendData(e){
        e.preventDefault();
       
        const newAppointment = {
            pname,
            email,
            phone,
            dname,
            date,
            time
        }

        axios.post("http://localhost:8070/appointment/add", newAppointment).then(() => {
            alert("Appointment Requested")
        }).catch((err) => {
            alert(err.message)
        })
    }
    

    return(
        <>
        <NavBar/>
        <div className="container">
            <form onSubmit={sendData} className="make-appointment-page">
                <div className="mb-3">
                    <label for="pname" className="form-label">Patient Name</label>
                    <input type="text" className="form-control" id="pname" placeholder="Enter Patient Name"
                    onChange={(e) => {

                        setPname(e.target.value);

                    }}/>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email Address"
                    onChange={(e) => {

                        setEmail(e.target.value);

                    }}/>
                </div>

                <div className="mb-3">
                    <label for="phone" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phone" placeholder="Enter Phone Numner"
                    onChange={(e) => {

                        setPhone(e.target.value);

                    }}/>
                </div>

                <div className="mb-3">
                    <label for="dname" className="form-label">Doctor Name</label>
                    <input type="text" className="form-control" id="dname" placeholder="Enter Doctor Name"
                    onChange={(e) => {

                        setDname(e.target.value);

                    }}/>
                </div>

                <div className="mb-3">
                    <label for="date" className="form-label">Appointment Date</label>
                    <input type="text" className="form-control" id="date" placeholder="Enter Appointment Date"
                    onChange={(e) => {

                        setDate(e.target.value);

                    }}/>
                </div>

                <div className="mb-3">
                    <label for="tiem" className="form-label">Appointment Time</label>
                    <input type="text" className="form-control" id="time" placeholder="Enter Appointment Time"
                    onChange={(e) => {

                        setTime(e.target.value);

                    }}/>
                </div>

                <button type="submit" className="btn btn-primary">Request</button>
                </form>
        </div>
        </>
    )

}