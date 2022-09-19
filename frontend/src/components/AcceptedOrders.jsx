import axios from "axios";
import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./styles/confirm.css";
import "./allServices.css";
import Sidebar from "./Sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function AcceptedOrders() {
  const auth = useSelector((state) => state.auth);
  const { email } = auth.user;

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log("email", email);
    const fetchData = async () => {
      await axios
        .get(`/checkout/accepted/${email}`)

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
          <div
            className="ui cards mt-4 container"
            style={{ marginLeft: "10%", marginBottom: "30px", zIndex: "3" }}
          >
            {services?.map((data, index) => (
              <div
                className="card"
                key={index}
                style={{ backgroundColor: "#DFFFDF" }}
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
                          style={{
                            backgroundColor: "#423E3B",
                            color: "white",
                            marginLeft: "250%",
                          }}
                          onClick={() => setModal(true)}
                        >
                          View
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
      <div
        class="modal fade"
        id="viewNote"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* Popup modal */}
        <Modal
          centered
          size="sm"
          isOpen={modal}
          toggle={() => setModal(!modal)}
        >
          <ModalHeader toggle={() => setModal(!modal)}>
            <h5>View Note</h5>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label>Title: </label>
                <input className="form-control" type="text" name="first_name" />
              </div>
              <div className="form-group">
                <label>Title: </label>
                <textarea className="form-control" rows="3" />
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}