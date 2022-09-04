import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./createService.css";

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
  const [image, setImage] = useState(false);
  const [service, setService] = useState(initialState);

  const [onEdit, setOnEdit] = useState(false);

  //image upload handler
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

  //delete image on cloudinary
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

  const handleChangeInput = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      setService({ ...service, [name]: checked });
    } else {
      const { name, value } = e.target;
      setService({ ...service, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("service", service);
    try {
      if (!image) return alert("No Image Upload");
      if (!(service.isCOD || service.isOnlinePayment))
        return alert("Please select a payment method");
      await axios
        .post("/services", { ...service, image })
        .then(() => {
          alert("Service created.");
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };
  return (
    <div className="card-row">
      <div className="card-column">
        <div className="bg-card">
          <label className="title">ADD BANK DETAILS</label>
          <div className="create_service">
           
            <form onSubmit={handleSubmit}>
              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="title" className="form-label">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    required
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="title" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="title"
                    id="title"
                    required
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="categories" className="form-label">
                    Bank
                  </label>
                  <select
                    name="category"
                    className="form-control"
                    onChange={handleChangeInput}
                  >
                    <option value="">Select a category</option>
                    <option value="IT">IT</option>
                    <option value="Repair">Repair</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="location" className="form-label">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    id="location"
                    required
                    onChange={handleChangeInput}
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
                        onChange={handleChangeInput}
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
                    {onEdit ? "Update" : "Publish"}
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
