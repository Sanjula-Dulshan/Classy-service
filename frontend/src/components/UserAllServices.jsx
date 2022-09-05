import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./utils/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmBox from "react-dialog-confirm";
import "./styles/confirm.css";
import "./allServices.css";
import Sidebar from "./Sidebar";

export default function UserAllServices() {
  const auth = useSelector((state) => state.auth);

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [publicId, setPublicId] = useState();

  const confirm = (id, public_id) => {
    setIsOpen(true);
    setId(id);
    setPublicId(public_id);
  };

  const handleDelete = async (id, public_id) => {
    console.log("deleteService", id, public_id);
    try {
      setLoading(true);
      const destroyImg = axios.post("/image/destroy", { public_id });
      const deleteService = axios.delete(`/services/${id}`);

      await destroyImg;
      await deleteService;

      setLoading(false);
      setIsOpen(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const { email } = auth.user;
    axios
      .get(`/services/${email}`)

      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleEdit = (id) => {
    navigate(`/editService/${id}`);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "100px" }}>
        <div style={{ position: "absolute", zIndex: "4" }}>
          <ConfirmBox // Note : in this example all props are required
            options={{
              icon: "https://img.icons8.com/ios/50/000000/error--v1.png",
              text: "Are you sure you want to delete this service ?",
              confirm: "yes",
              cancel: "no",
              btn: true,
            }}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => {
              handleDelete(id, publicId);
            }}
            onCancel={handleClose}
          />
        </div>
        <div
          className="ui cards mt-4 container"
          style={{ marginLeft: "10%", marginBottom: "30px", zIndex: "3" }}
        >
          {services?.map((data, index) => (
            <div
              className="card"
              key={index}
              style={{ backgroundColor: "#FBFDF3" }}
            >
              <div className="content">
                <div className="header mt-2 mb-4">
                  <b>{data.title}</b>
                </div>
                <div className="mb-2">{truncate(data?.description, 75)}</div>
                <i className=" ">
                  <span className="fw-bold ">Fee: </span>Rs.
                  {data.fee}
                </i>
              </div>
              <div className="extra content">
                <div className="ui two buttons" style={{ marginLeft: "10%" }}>
                  <tr>
                    <td>
                      <div
                        className="ui button"
                        style={{ backgroundColor: "#FEA82F", color: "black" }}
                        onClick={() => handleEdit(data._id)}
                      >
                        Edit
                      </div>
                    </td>
                    <td>
                      <div
                        className="ui button "
                        style={{
                          marginLeft: "50px",
                          backgroundColor: "red",
                          color: "white",
                        }}
                        onClick={() => confirm(data._id, data.image.public_id)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
