import axios from "axios";
import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmBox from "react-dialog-confirm";
import "./styles/confirm.css";
import "./allServices.css";
import Sidebar from "./Sidebar";
import { Store } from "react-notifications-component";

export default function PendingOrders() {
  const auth = useSelector((state) => state.auth);

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [status, setStatus] = useState();

  const confirm = (id, status) => {
    setIsOpen(true);
    setId(id);
    setStatus(status);

    if (status === "accept") setAccept(true);
    if (status === "reject") setReject(true);
    console.log("status", status);
  };

  const handleBtn = async (id, status) => {
    if (accept) {
      try {
        setLoading(true);
        await axios.patch(`/services/${id}`, { status });
        setLoading(false);
        setIsOpen(false);
        Store.addNotification({
          title: "Service Accepted Successfully",

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
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
    if (reject) {
      try {
        setLoading(true);
        await axios.patch(`/services/${id}`, { status });
        setLoading(false);
        setIsOpen(false);
        Store.addNotification({
          title: "Service Rejected ",

          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          type: "danger",
          insert: "top",
          container: "top-right",

          dismiss: {
            duration: 2500,
            onScreen: true,
            showIcon: true,
          },

          width: 400,
        });
      } catch (err) {
        alert(err.response.data.msg);
      }
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
        console.log(res.data);
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Sidebar />
      {loading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
        <div style={{ marginLeft: "100px" }}>
          <div style={{ position: "absolute", zIndex: "704" }}>
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
              onConfirm={() => handleBtn(id, status)}
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
                  <span className="fw-bold ">Location: </span>
                  {data.location}
                  <br />
                  <span className="fw-bold ">Fee: </span>Rs.
                  {data.fee}
                  <br />
                  <span className="fw-bold ">Phone </span>
                  {data.phone}
                </div>
                <div className="extra content">
                  <div className="ui two buttons" style={{ marginLeft: "10%" }}>
                    <tr>
                      <td>
                        <div
                          className="ui button"
                          style={{ backgroundColor: "#FEA82F", color: "black" }}
                          onClick={() => confirm(data._id, "Accept")}
                        >
                          Accept
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
                          onClick={() => confirm(data._id, "Reject")}
                        >
                          Reject
                        </div>
                      </td>
                    </tr>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
