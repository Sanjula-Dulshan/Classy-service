import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { confirmAlert } from 'react-confirm-alert';
import { Store } from 'react-notifications-component'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default function AddBank() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("1234");
  const [accName, setAccName] = useState();
  const [accNumber, setAccNumber] = useState();
  const [bankName, setBankName] = useState();
  const [branchName, setBranchName] = useState();
  const [isAgree, setIsAgree] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgree) {
      alert("Please agree to the terms and conditions");
      return;
    }else{
      setLoading(true);
      const newBank = {
        uid,
        accName,
        accNumber,
        bankName,
        branchName,
      }

      console.log(newBank);
      try {
        await axios.post("/bank/", newBank);
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
            showIcon: true
          },

          width:400
        }); 
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    }
    
  };

  const cancel = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  
  return (
    <div className="card-row">
      <div className="card-column">
        <LoadingOverlay
              active={loading}
              spinner={<PropagateLoader />}
          >
        <div className="bg-card">
          <label className="title">ADD BANK DETAILS</label>
          <div className="add_bank">

            
           
            <form onSubmit={handleSubmit}>
              
                <div className="">
                  <label htmlFor="title" className="form-label">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="acc_name"
                    id="acc_name"
                    required
                    onChange={(e) => setAccName(e.target.value)}
                  />
                </div>
              

              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="title" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="acc_number"
                    id="acc_number"
                    required
                    onChange={(e) => setAccNumber(e.target.value)}
                  />
                </div>
              </div>

              
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="categories" className="form-label">
                    Bank
                  </label>
                  <select
                    name="bank"
                    className="form-control"
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Commercial Bank of Ceylon">Commercial Bank of Ceylon</option>
                    <option value="Sampath Bank Plc">Sampath Bank Plc</option>
                    <option value="National Savings Bank">National Savings Bank</option>
                    <option value="People’s Bank">People’s Bank</option>
                    <option value="Hatton National Bank">Hatton National Bank</option>
                    <option value="Seylan Bank Plc">Seylan Bank Plc</option>
                    <option value="National Development Bank Plc">National Development Bank Plc</option>
                    <option value="Nations Trust Bank Plc">Nations Trust Bank Plc</option>
                    <option value="DFCC Bank">DFCC Bank</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="location" className="form-label">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch" 
                    className="form-control"
                    id="branch"
                    required
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </div>
              </div>

             

              <div className="row mt-5">
                <div className="col">
                  <div className="form-check">
                    <div>
                      <input
                        type="checkbox"
                        className="form-check-input"
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
