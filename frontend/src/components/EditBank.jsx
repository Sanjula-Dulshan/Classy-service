import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./AddBank.css";
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { confirmAlert } from 'react-confirm-alert';
import { Store } from 'react-notifications-component'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default function EditBank() {
  const [loading, setLoading] = useState(false);
  const [id , setId] = useState();
  const [uid, setUid] = useState("1234");
  const [accName, setAccName] = useState();
  const [accNumber, setAccNumber] = useState();
  const [bankName, setBankName] = useState();
  const [branchName, setBranchName] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [editText, setEditText] = useState("Edit");

  useEffect(() => {
    const getBank = async () => {
      const res = await axios.get("/bank/user/" + uid);
      setAccName(res.data.accName);
      setAccNumber(res.data.accNumber);
      setBankName(res.data.bankName);
      setBranchName(res.data.branchName);
      setId(res.data._id);
    };
    getBank();

  }, [uid]);


  const handleEnable = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
    if (disabled) {
      setEditText("Cancel");
    } else {
      setEditText("Edit");
    }

  };
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgree) {
      alert("Please agree to the terms and conditions");
      return;
    }else{
      
      confirmAlert({
        title: 'Warning!',
        message: 'Are sure you want to delete this account?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setLoading(true);
              const newBank = {
                        uid,
                        accName,
                        accNumber,
                        bankName,
                        branchName,
                      }


              axios.put("/bank/"+id,newBank ).then((res)=>{
                  setLoading(false);
                  setDisabled(!disabled);
                  Store.addNotification({
                    title: "Bank Details Updated Successfully",
                    message: "Your payment details have been updated successfully",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    
                    dismiss: {
                      duration: 1500,
                      onScreen: true,
                      showIcon: true
                    },
          
                    width:400
                  }); 
                  
              }).catch((err)=>{
                alert(err.message);
              })
            }
          },
          {
            label: 'No',
  
          }
        ]
      });
      
    }
  };


  const handleDelete = async (e) => {
    e.preventDefault();

    confirmAlert({
      title: 'Warning!',
      message: 'Are sure you want to delete this account?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setLoading(true);
            axios.delete("/bank/"+id).then((res)=>{
                setLoading(false);
                Store.addNotification({
                  title: "Bank Details Deleted Successfully",
                  message: "Your bank data has been deleted successfully",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  type: "danger",
                  insert: "top",
                  container: "top-right",
                  
                  dismiss: {
                    duration: 1500,
                    onScreen: true,
                    showIcon: true
                  },
        
                  width:400
                }); 
                //wait for 1.5 seconds and redirect to the home page
                setTimeout(() => {
                  window.location.href = "/";
                }, 1500);

                
            }).catch((err)=>{
              alert(err.message);
            })
          }
        },
        {
          label: 'No',

        }
      ]
    });
  }

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   //confirm delete
  //   if (window.confirm("Are you sure you want to delete this bank account?")) {

  //     try {
  //       await axios.delete("/bank/"+id);
  //       alert("Bank account deleted successfully");
  //       window.location.replace("/");
  //     } catch (err) {
  //       alert(err);
  //     }
  //   }
  //   setLoading(false);
  // }
    



  
  return (
    <div className="card-row">
      <div className="card-column">
        <LoadingOverlay
              active={loading}
              spinner={<PropagateLoader />}
          >
        <div className="bg-card">
          <label className="title">EDIT BANK DETAILS</label>
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
                    value={accName}
                    disabled={disabled}
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
                    disabled={disabled}
                    required
                    value={accNumber}
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
                    id="bank"
                    required
                    disabled={disabled}
                    value={bankName}
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
                    disabled={disabled}
                    value={branchName}
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
                  <button onClick={handleEnable} className="btn btn-cancel">
                    Edit
                  </button>
                  <button onClick={handleDelete} className="btn btn-del">
                    Delete
                  </button>
                  <button disabled={disabled} type="submit" className="btn btn-create">
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
