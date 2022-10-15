import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";
import Sidebar from "./Sidebar";
import LoadingOverlay from "react-loading-overlay";
import PropagateLoader from "react-spinners/PropagateLoader";
import { confirmAlert } from "react-confirm-alert";
import { Store } from "react-notifications-component";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CardPay() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("1234");
  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCVV] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [amount, setAmount] = useState(54545454);
  const [checkoutId, setCheckoutId] = useState(
    localStorage.getItem("checkoutId")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newCard = {
      uid,
      cardName,
      cardNumber,
      cvv,
      expiryDate,
      amount,
      checkoutId,
    };

    console.log(newCard);
    try {
      await axios.post("/CardPay/", newCard);
      Store.addNotification({
        title: "Bank Details Saved Successfully",
        message: "Your will recive your payments to this account",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 1500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
      setTimeout(() => {
        window.location.href = "/allservices";
      }, 1500);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  const cancel = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="b-card-row">
      <Sidebar />
      <div className="b-card-column">
        <LoadingOverlay active={loading} spinner={<PropagateLoader />}>
          <div className="bg-card">
            <label className="title">VISA / MASTER Payment</label>
            <div className="add_bank">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <label htmlFor="title" className="form-label">
                    Card holder Name
                  </label>
                  <input
                    type="text"
                    className="form-control thick-border"
                    name="acc_name"
                    id="acc_name"
                    required
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label htmlFor="title" className="form-label">
                      Card Number
                    </label>
                    <input
                      type="number"
                      className="form-control thick-border"
                      name="acc_number"
                      id="acc_number"
                      required
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="categories" className="form-label">
                      CVV
                    </label>
                    <input
                      type="tel"
                      className="form-control thick-border"
                      name="bank_name"
                      id="bank_name"
                      pattern="[0-9]{3}"
                      maxLength={3}
                      min={0}
                      required
                      onChange={(e) => setCVV(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="location" className="form-label">
                      Exp date
                    </label>
                    <input
                      type="month"
                      name="branch"
                      className="form-control thick-border"
                      id="branch"
                      required
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col">
                    <div className="form-check">
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input thick-border"
                          name="needBuyerAddress"
                          id="exampleCheck1"
                          onChange={(e) => setIsAgree(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          I accept terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col flex_box">
                    <button onClick={cancel} className="btn btn-cancel">
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-create">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    </div>
  );
}
