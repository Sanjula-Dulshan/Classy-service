import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";
import Sidebar from "./Sidebar";
import LoadingOverlay from "react-loading-overlay";
import PropagateLoader from "react-spinners/PropagateLoader";
import { confirmAlert } from "react-confirm-alert";
import { Store } from "react-notifications-component";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import { Hint } from 'react-autocomplete-hint';
import cities from './constants.js';

export default function Checkout() {
  const auth = useSelector((state) => state.auth);

  const hintArray = [ "Matara", "Galle", "Hambanthota"]

  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("yasanthamax@gmail.com");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [addressLine1, setAddress1] = useState();
  const [addressLine2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [province, setProvincee] = useState();
  const [mobile, setPhone] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [serviceProviderEmail, setServiceProviderEmail] = useState(
    localStorage.getItem("userEmail")
  );
  const [amount, setAmount] = useState(localStorage.getItem("fee"));
  const [serviceTitle, setServiceTitle] = useState(
    localStorage.getItem("title")
  );
  const [url, setImage] = useState(localStorage.getItem("image"));
  const [public_id, setPublicId] = useState(localStorage.getItem("public_id"));

  useEffect(() => {
    const { email } = auth.user;
    setUid(email);
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = {
      public_id,
      url,
    };

    setLoading(true);
    const newCheckout = {
      uid,
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      city,
      province,
      mobile,
      date,
      time,
      serviceProviderEmail,
      amount,
      serviceTitle,
      image,
    };

    console.log(newCheckout);
    try {
      await axios.post("/checkout/", newCheckout).then((res) => {
        console.log(res.data);
        localStorage.setItem("checkoutId", res.data.id);
        setLoading(false);

        Store.addNotification({
          title: "Checkout Details Saved Successfully",
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
          window.location.href = "/selectpaymethod";
        }, 1500);
      });
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
            <label className="title">Checkout</label>
            <div className="add_bank">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="categories" className="form-label">
                      First Name
                    </label>
                    <input
                      name="fname"
                      type="text"
                      className="form-control thick-border"
                      onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                  </div>
                  <div className="col">
                    <label htmlFor="location" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control thick-border"
                      id="lastName"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label htmlFor="title" className="form-label">
                      E-Mail address
                    </label>
                    <input
                      type="email"
                      className="form-control thick-border"
                      name="email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label htmlFor="title" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control thick-border"
                      name="phone"
                      id="phone"
                      required
                      pattern="07[1,2,5,6,7,8,9,0][0-9]{7}"
                      maxLength="10"
                      placeholder="07xxxxxxxx"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="categories" className="form-label">
                      Date
                    </label>
                    <input
                      name="fname"
                      type="date"
                      className="form-control thick-border"
                      onChange={(e) => setDate(e.target.value)}
                    ></input>
                  </div>
                  <div className="col">
                    <label htmlFor="location" className="form-label">
                      Time
                    </label>
                    <input
                      type="time"
                      name="lastName"
                      className="form-control thick-border"
                      id="lastName"
                      required
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label htmlFor="title" className="form-label">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control thick-border"
                      name="ad1"
                      id="ad1"
                      required
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label htmlFor="title" className="form-label">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      className="form-control thick-border"
                      name="ad2"
                      id="ad2"
                      required
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="categories" className="form-label">
                      Province
                    </label>
                    <select
                      name="fname"
                      type="text"
                      className="form-control thick-border"
                      onChange={(e) => setProvincee(e.target.value)}
                      required
                    >
                      <option value="">Select One</option>
                      <option value="Western">Western</option>
                      <option value="Southern">Southern</option>
                      <option value="Central">Central</option>
                      <option value="Eastern">Eastern</option>
                      <option value="Northern">Northern</option>
                      <option value="North Western">North Western</option>
                      <option value="North Central">North Central</option>
                      <option value="Uva">Uva</option>
                      <option value="Sabaragamuwa">Sabaragamuwa</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="location" className="form-label">
                      City
                    </label>
                    <Hint options={cities} allowTabFill>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control thick-border"
                        id="lastName"
                        required
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Hint>
                  </div>
                </div>

                <div className="row ">
                  <div className="col flex_box">
                    <button onClick={cancel} className="btn btn-cancel">
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-create">
                      Next
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
