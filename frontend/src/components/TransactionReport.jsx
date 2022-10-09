
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';

import "./AddBank.css";
import generatePDF from "./TransReport";

export default function TransactionReport() {

  const[request,setRequest] = useState([]);
  const[loading,setLoading] = useState(false);
  const[searchTerm,setSearchTerm] = useState("");


  useEffect(() => {
    setLoading(true);
    axios.get("/checkout/").then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, []);


  return (
    <div className="card-row2">
      <div className="card-column2">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="m-sub-container2">
              <label> Select Year & Month: </label>
              <input type="month" id="start" name="trip-start"></input>

                        <div className="m-sub-container2">
                            
                        <label> Select Year & Month:  </label>
                        <input type="month" id="start" name="trip-start"></input>

                            <button onClick={()=>generatePDF(request)} className="btn-report" >Download PDF <img src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-cash-30_mwwzdi.png" /></button>
                        </div>
  
                    </div>


          <div className="t-list-tb-container">
            <LoadingOverlay active={loading} spinner={<PropagateLoader />}>
              <table className="t-table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Reciver</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {request.map((data, index) => (
                    <tr key={index}>

                       <th scope="row">{index+1}</th>
                       <td>{data._id}</td>
                       <td>{ data.serviceProviderEmail}</td>
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
