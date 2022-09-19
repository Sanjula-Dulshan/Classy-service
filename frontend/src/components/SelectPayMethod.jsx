import React, { useState } from "react";

import "./AddBank.css";



export default function SelectPayMethod() {
  
  
  return (
    <div className="card-row">
      <div className="card-column">

        <div >
          <label className="title">SELECT PAYMENT METHOD</label>
          

            <div className="method-container">
              <button className="btn-payon" >Credit/Debit Card <img src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-credit-card-30_zpetxw.png" /> </button> <br />
              <button className="btn-payon" >Bank Payment <img width={"30px"} src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-merchant-account-50_f10lwd.png" /></button>
            
            </div>  
            <div className="method-container2">
              <button className="btn-payoff" >Cash On Delivery <img src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-cash-30_mwwzdi.png" /></button>
            </div> 

            
          
            
  
        </div>

      </div>
    </div>

    
  );
}
