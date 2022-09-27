import axios from "axios";
import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmBox from "react-dialog-confirm";
import "./styles/confirm.css";
import "./allServices.css";
import Sidebar from "./Sidebar";
import { Store } from "react-notifications-component";

export default function RejectedOrders() {
  const auth = useSelector((state) => state.auth);
  const { email } = auth.user;

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);
  const [isOpenDeleteAll, setIsOpenDeleteAll] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    console.log("email", email);
    const fetchData = async () => {
      await axios
        .get(`/checkout/rejected/${email}`)

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

  const handleDeleteAll = async (id) => {
    console.log("deleteService", id);
    try {
      setLoading(true);
      const deleteService = axios.delete(`/checkout/${id}`);

      await deleteService;
      setLoading(false);
      setIsOpenDeleteAll(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteAll = () => {
    services
      .forEach((service) => {
        if (service.checked) {
          handleDeleteAll(service._id);
        }
      })
      .then(() => {
        setLoading(false);
        setIsCheck(false);
        Store.addNotification({
          title: "Services Deleted Successfully",

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
      });
  };

  const handleCloseDeleteAll = () => {
    setIsOpenDeleteAll(!isOpenDeleteAll);
  };

  const confirmDeleteAll = () => {
    setIsOpenDeleteAll(true);
  };

  const checkAll = () => {
    services.forEach((service) => {
      service.checked = !isCheck;
    });
    setServices([...services]);
    setIsCheck(!isCheck);
  };

  const handleCheck = (id) => {
    services.forEach((service) => {
      if (service._id === id) service.checked = !service.checked;
    });
    setServices([...services]);
  };

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
                text: "Are you sure you want to services ?",
                confirm: "yes",
                cancel: "no",
                btn: true,
              }}
              isOpen={isOpenDeleteAll}
              onClose={handleCloseDeleteAll}
              onConfirm={deleteAll}
              onCancel={handleCloseDeleteAll}
            />
          </div>

          <div className="delete-all">
            <span>Select all</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <button onClick={confirmDeleteAll}>Delete ALL</button>
          </div>
          <div
            className="ui cards mt-4 container"
            style={{ marginLeft: "10%", marginBottom: "30px", zIndex: "3" }}
          >
            {services?.map((data, index) => (
              <div
                className="card"
                key={index}
                style={{ backgroundColor: "#FBE4E4" }}
              >
                <div className="content">
                  <input
                    type="checkbox"
                    checked={data.checked}
                    onChange={() => handleCheck(data._id)}
                  />
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
