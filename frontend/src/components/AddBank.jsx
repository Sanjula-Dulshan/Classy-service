import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";

const initialState = {
  title: "",
  description: "",
  category: "",
  location: "",
  fee: "",
  phone: "",
  needBuyerAddress: false,
  needDate: false,
  isCOD: false,
  isOnlinePayment: false,
  image: "",
};
export default function CreateService() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const [accName, setAccName] = useState();
  const [accNumber, setAccNumber] = useState();
  const [bankName, setBankName] = useState();
  const [branchName, setBranchName] = useState();
  const [isAgree, setIsAgree] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newBank = {
      uid,
      accName,
      accNumber,
      bankName,
      branchName,
    }
    try {
      await axios.post("/bank/add", newBank);
      window.location.replace("/bank");
    } catch (err) {
      alert(err);
    }
    setLoading(false);
    
  };

  
  return (
    <div className="card-row">
      <div className="card-column">
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
                    onChange={setAccName}
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
                    onChange={setAccNumber}
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
                    onChange={setBankName}
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
                    onChange={setBranchName}
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
                        onChange={setIsAgree}
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
                  <button type="submit" className="btn btn-cancel">
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
      </div>
    </div>
  );
}
