import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import RiseLoader from "react-spinners/RiseLoader";
import "./styles/createService.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "./Sidebar";
import { Store } from "react-notifications-component";
import ConfirmBox from "react-dialog-confirm";

const initialState = {
  userEmail: "",
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
  const auth = useSelector((state) => state.auth);
  const { email } = auth.user;
  initialState.userEmail = email;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [service, setService] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const param = useParams();
  const navigate = useNavigate();

  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    console.log("param: ", param);
    if (param.id) {
      setOnEdit(true);
      axios.get("/services").then((res) => {
        res.data.forEach((service) => {
          if (service._id === param.id) {
            setService(service);
            setImage(service.image);
            console.log("service", service);
          }
        });
      });
    } else {
      setOnEdit(false);
      setService(initialState);
      setImage(false);
    }
  }, []);

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

  const confirm = (e) => {
    e.preventDefault();
    console.log("onEdit", onEdit);

    if (onEdit) {
      setIsOpen(true);
    } else {
      handleSubmit(e);
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("service", service);
    try {
      if (!image) return alert("No Image Upload");
      if (!(service.isCOD || service.isOnlinePayment))
        return alert("Please select a payment method");

      if (onEdit) {
        await axios
          .put(`/services/${service._id}`, { ...service, image })
          .then(() => {
            Store.addNotification({
              title: "Service Updated Successfully",

              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              type: "success",
              insert: "top",
              container: "top-right",

              dismiss: {
                duration: 2500,
                onScreen: true,
                showIcon: true,
              },

              width: 400,
            });
            navigate(`/userServices`);
          });
      } else {
        console.log("image", image);
        await axios
          .post("/services", { ...service, image })
          .then(() => {
            Store.addNotification({
              title: "Service Created Successfully",

              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              type: "success",
              insert: "top",
              container: "top-right",

              dismiss: {
                duration: 2500,
                onScreen: true,
                showIcon: true,
              },

              width: 400,
            });
            setService(initialState);
            setImage(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    } catch (err) {
      alert(err);
    }
  };
  const handleCancel = () => {
    navigate(`/userServices`);
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };
  return (
    <div>
      <SideBar />
      {pageLoading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={pageLoading} size={30} />
        </div>
      ) : (
        <div>
          <div style={{ position: "absolute", zIndex: "704" }}>
            <ConfirmBox // Note : in this example all props are required
              options={{
                icon: "https://img.icons8.com/ios/50/000000/error--v1.png",
                text: "Are you sure you want to update this service ?",
                confirm: "yes",
                cancel: "no",
                btn: true,
              }}
              isOpen={isOpen}
              onClose={handleClose}
              onConfirm={handleSubmit}
              onCancel={handleClose}
            />
          </div>
          <div className="card-row">
            <div className="card-column">
              <div className="bg-car">
                {onEdit ? (
                  <label className="title">EDIT SERVICE</label>
                ) : (
                  <label className="title">CREATE SERVICE</label>
                )}

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

                  <form onSubmit={confirm}>
                    <div className="row mt-4">
                      <div className="col">
                        <label htmlFor="title" className="form-label">
                          Title
                          <label className="t-form-label2">*</label>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          id="title"
                          required
                          spellcheck="true"
                          value={service.title}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col">
                        <label htmlFor="description" className="form-label">
                          Description
                          <label className="t-form-label2">*</label>
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          className="form-control"
                          id="description"
                          required
                          spellcheck="true"
                          rows="5"
                          value={service.description}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <label htmlFor="categories" className="form-label">
                          Categories:
                          <label className="t-form-label2">*</label>
                        </label>
                        <select
                          name="category"
                          className="form-control"
                          value={service.category}
                          onChange={handleChangeInput}
                        >
                          <option value="">Select a category</option>
                          <option value="Technicians">Technicians</option>
                          <option value="Repair">Repair</option>
                          <option value="IT">IT</option>
                          <option value="House">House</option>
                          <option value="Garden">Garden</option>
                          <option value="Beauty & Event">Beauty & Event</option>
                        </select>
                      </div>
                      <div className="col">
                        <label htmlFor="location" className="form-label">
                          Location
                          <label className="t-form-label2">*</label>
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          id="location"
                          required
                          spellcheck="true"
                          value={service.location}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col">
                        <label htmlFor="phone" className="form-label">
                          Mobile No:
                          <label className="t-form-label2">*</label>
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          id="phone"
                          required
                          onChange={handleChangeInput}
                          pattern="07[1,2,5,6,7,8][0-9]{7}"
                          maxLength="10"
                          placeholder="07xxxxxxxx"
                          value={service.phone}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="fee" className="form-label">
                          Fee (Rs.)
                          <label className="t-form-label2">*</label>
                        </label>
                        <input
                          type="number"
                          name="fee"
                          className="form-control"
                          id="fee"
                          required
                          min={500}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="minimum fee is Rs.500"
                          value={service.fee}
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
                              checked={service.needBuyerAddress}
                              onChange={handleChangeInput}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              I need buyer’s address to provide the service
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="needDate"
                              id="exampleCheck1"
                              checked={service.needDate}
                              onChange={handleChangeInput}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              I need the date and time to deliver my service
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col">
                        <label
                          htmlFor="description"
                          className="form-label fw-bolder "
                        >
                          I accept payment by:
                          <label className="t-form-label2">*</label>
                        </label>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="isCOD"
                            id="exampleCheck1"
                            checked={service.isCOD}
                            onChange={handleChangeInput}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Cash On Deliver
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="isOnlinePayment"
                            id="exampleCheck1"
                            checked={service.isOnlinePayment}
                            onChange={handleChangeInput}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Online Payments
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col flex_box">
                        <button
                          type="button"
                          className="btn btn-cancel"
                          onClick={handleCancel}
                        >
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
        </div>
      )}
    </div>
  );
}
