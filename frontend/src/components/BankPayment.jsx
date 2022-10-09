import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { confirmAlert } from 'react-confirm-alert';
import { Store } from 'react-notifications-component'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default function BankPayment() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("1234");
  const [Date, setDate] = useState();
  const [invoiceNo, setInvoiceNo] = useState();
  const [bankName, setBankName] = useState();
  const [branchName, setBranchName] = useState();
  const [image, setImage] = useState(false);
  const [checkoutId, setCheckoutId] = useState(localStorage.getItem("checkoutId"));


  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      console.log("e.target", e.target.files[0]);
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 5 * 1024 * 1024)
        // 5mb
        return alert("Maximum file size: 5MB");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Please upload only jpeg/png");

      let formData = new FormData();
      console.log("formData", formData);
      formData.append("file", file);
      console.log("formData.append", formData);

      setLoading(true);
      const res = await axios.post("/image/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setLoading(false);
      setImage(res.data);
      console.log("res", res);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };


  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post("/image/destroy", { public_id: image.public_id });
      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
      const newBank = {
        uid,
        Date,
        invoiceNo,
        bankName,
        branchName,
        image,
        checkoutId
      }

      console.log(newBank);
      try {
        await axios.post("/bankpay/", newBank).then((res) => {
          console.log(res.data);

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
        }).catch((err) => {
          console.log(err);
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
      <div className="b-card-column">
        <LoadingOverlay
              active={loading}
              spinner={<PropagateLoader />}
          >
        <div className="bg-card">
          <label className="title">Bank Deposit</label>
          <div className="add_bank">

            
           
            <form onSubmit={handleSubmit}>
              
                             

              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="title" className="form-label">
                    Invoice No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="inv_number"
                    id="inv_number"
                    required
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="title" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="acc_number"
                    id="acc_number"
                    required
                    onChange={(e) => setDate(e.target.value)}
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

             

              <div className="create_service">
              <div className="upload">
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
                    />
                    {loading ? (
                      <div id="file_img">
                        <Loading />
                      </div>
                    ) : (
                      <div id="file_img" style={styleUpload}>
                        <img src={image ? image.url : ""} alt="" />
                        <span onClick={handleDestroy}>X</span>
                      </div>
                    )}
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
