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
  const { email } = auth.user;

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
  };

  const handleBtn = async (id, status) => {
    if (accept) {
      setAccept(false);

      console.log("42");
      console.log("accept: ", accept);
      console.log("reject: ", reject);
      try {
        setLoading(true);
        await axios
          .patch(`/checkout/${id}`, { status })
          .then(() => {
            setIsOpen(false);
            setLoading(false);

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
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        alert(err.response.data.msg);
        setLoading(false);
        setIsOpen(false);
      }
    }
    if (reject) {
      setReject(false);
      console.log("82");
      console.log("accept: ", accept);
      console.log("reject: ", reject);

      try {
        setLoading(true);
        await axios.patch(`/checkout/${id}`, { status });
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
        setLoading(false);
        setIsOpen(false);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("email", email);
    const fetchData = async () => {
      await axios
        .get(`/checkout/pending/${email}`)

        .then((res) => {
          console.log(res.data);
          setServices(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [email, loading]);

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
                  <div className="fw-bold fs-4 mb-3 text-capitalize">
                    {data.serviceTitle}
                  </div>
                  <span className="fw-bold ">Location: </span>
                  {data.city}
                  <br />
                  <span className="fw-bold ">Contact: </span>
                  {data.mobile}
                  <br />
                  <span className="fw-bold ">Payment: </span>Rs.
                  {data.amount}
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <tr>
                      <td>
                        <div
                          className="ui button"
                          style={{ backgroundColor: "#FEA82F", color: "black" }}
                          onClick={() => confirm(data._id, "accept")}
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
                          onClick={() => confirm(data._id, "reject")}
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
