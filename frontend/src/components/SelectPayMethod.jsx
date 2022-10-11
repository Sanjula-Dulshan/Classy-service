import React, { useState } from "react";

import "./AddBank.css";

export default function SelectPayMethod() {
  const gotobank = () => {
    window.location.href = "/bankpayment";
  };

  return (
    <div className="card-row2">
      <div className="card-column2">
        <div>
          <label className="title">SELECT PAYMENT METHOD</label>

          <div className="method-container">
            <a href="/cardpayment">
              <button className="btn-payon" href="/cardpayment">
                Credit/Debit Card{" "}
                <img
                  src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-credit-card-30_zpetxw.png"
                  alt=""
                />
              </button>{" "}
              <br />
            </a>

            <button className="btn-payon" onClick={gotobank}>
              Bank Payment{" "}
              <img
                width={"30px"}
                src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-merchant-account-50_f10lwd.png"
                alt=""
              />
            </button>
          </div>
          <div className="method-container2">
            <a href="/allservices">
              <button className="btn-payoff">
                Cash On Delivery{" "}
                <img
                  src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1662391777/icons8-cash-30_mwwzdi.png"
                  alt=""
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
