import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";
import NavBar from './NavBar';



function Mycards(){

    const [column, setColumns] = useState([]);
    const [payments, setPayment] = useState([]);
    
   async function deletePayment(id){
        const confirmed = window.confirm("Are you sure you want to delete this payment?");
        if (confirmed) {
          try {
            const response = await axios.delete(`http://localhost:8070/ipayments/delete/${id}`);
            alert('Payment successfully deleted.');
            window.location="/view-payment";
          } catch (err) {
            console.error(err);
            alert('An error occurred while deleting the payment.');
          }
        }
        else{
          window.location="/view-payment";
        }
      };


    useEffect(() => {
        function getPayment() {
            
            axios.get("http://localhost:8070/ipayments/").then((res) => {
                
                setPayment(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPayment();
    }, [])


    return(
    <div>
        <NavBar/>
        <div class='container'>
    <div class='row'>
        <div class='col-12'>
        <center><h1>Payment Details</h1></center>
            <center><h2>MY CARD</h2></center>
           <center> <a href="/add-payment"> <button className="btn btn-primary mb-1">Add Card details</button></a></center>
            <div class="card-group">  
            {payments.map((payments,index) => (
                <div key={index} class="card text-center" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title" >CARD {index+1}</h5>
                    <p>{payments.Cholder}</p>
                    <p>{payments.Cnumber}</p>
                    <p>{payments.date}</p>
                    <p>{payments.cvv}</p>
                    <Link href="#" to={`/update-payment/${payments._id}`} class="btn btn-primary mt-1">Edit</Link><br/>
                    <Link href="#" onClick={() => deletePayment(payments._id)} class="btn btn-danger mt-1">Remove</Link><br/>
                         </div>
                     </div>   
                    ))}
                
            </div>
        </div>
    </div>
</div>
    </div>
)

}

export default Mycards;