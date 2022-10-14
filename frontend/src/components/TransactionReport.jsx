
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import DatePicker from "react-datepicker";


import "./AddBank.css";
import Sidebar from "./Sidebar";
import generatePDF from "./TransReport";

export default function TransactionReport() {

  const[request,setRequest] = useState([]);
  const[loading,setLoading] = useState(false);
  const[searchTerm,setSearchTerm] = useState("");
  const [month, setMonth] = useState();


  useEffect(() => {
    setLoading(true);
    axios.get("/checkout/").then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, []);

  function handleSearch(e) {
    const search = (e.currentTarget.value);

    axios.get("/checkout/").then((res)=>{  
 
              filterData(res.data,search)
 
    
    });
   }

   const filterData = (transactions,search) =>{

    const result= transactions.filter((Transaction) =>
    Transaction._id.toLowerCase().includes(search) 
     ||
    Transaction.serviceProviderEmail.includes(search)||Transaction.serviceProviderEmail.toUpperCase().includes(search) ||
    Transaction.createdAt.toLowerCase().includes(search) ||Transaction.createdAt.toUpperCase().includes(search) ||
    Transaction.updatedAt.includes(search)
    )
    
    setRequest(result)

  }


  return (
    <div className="card-row2">
      <Sidebar />
      <div className="tr-card-column2">
        <div>
          <label className="title">Transaction History</label>

          <div
            className="l-filter-container"
            style={{
              backgroundColor: "#FFFFFF",
              paddingTop: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingBottom: "5px",
            }}
          >
            <div className="m-sub-container">
              <input
                placeholder="Search"
                className="l-sbox input-search"
                type="text"
                onChange={handleSearch}
              />
            </div>

           

                        <div className="m-sub-container2"> 
                            
                        <label> Select Year & Month:  </label>
                        <input type="month" id="start" name="trip-start" onChange={handleSearch}></input>
                            <button onClick={()=>generatePDF(request)} className="btn-report" >Download PDF <img src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-cash-30_mwwzdi.png" /></button>
                        </div>
  
         


          <div className="t-list-tb-container">
          <div className="bg-card">

             {/* display no of records in request */} <br/>
             <label className="report-text ">Total Records: <div style={{color:"blue"}}>{request.length} </div> </label>< br />

            <label className="report-text ">Total Income: <div style={{color:"#03a311"}}>{request.map((data)=> Number(data.amount.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}.00 </div></label> < br />
           
            {/* display total for card method */}
            <label className="report-text ">Total Card Payments: <div style={{color:"#c49704"}}>Rs.{request.filter((data)=>data.paymentMethod=="card").map((data)=> Number(data.amount.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}.00 </div> </label>< br />
            {/* display total for bank method */}
            <label className="report-text ">Total Bank Payments: <div style={{color:"#c49704"}}>Rs.{request.filter((data)=>data.paymentMethod=="bank").map((data)=> Number(data.amount.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}.00 </div> </label>< br />
            {/* display total for cod  method */}
            <label className="report-text ">Total COD Payments: <div style={{color:"#c49704"}}>Rs.{request.filter((data)=>data.paymentMethod=="Cash On Delivery").map((data)=> Number(data.amount.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}.00 </div>  </label>< br />

            {/* display total refunds*/}
            <label className="report-text ">Total Refunds: <div style={{color:"red"}}>Rs.{request.filter((data)=>data.orderStatus=="reject").map((data)=> Number(data.amount.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}.00 </div> </label>
          </div>  
            <LoadingOverlay active={loading} spinner={<PropagateLoader />}>
              <table className="t-table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Reciver</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {request?.map((data, index) => (
                    <tr key={index}>

                       <th scope="row">{index+1}</th>
                       <td>{data._id}</td>
                       <td>{ data.serviceProviderEmail}</td>
                       <td>{ data.createdAt}</td>
                       <td>{ data.orderStatus}</td>   
                       <td>
                       { data.amount}    
                       </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </LoadingOverlay>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
