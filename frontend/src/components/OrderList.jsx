import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Store } from "react-notifications-component";
import ReactStars from "react-rating-stars-component";
import "./ratings/rstyle.css";

import Sidebar from "./Sidebar";

export default function OrderList() {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState([]);
  const [comment, setComment] = useState("");
  const [modal, setModal] = useState(false);
  const [orderID, setOrderID] = useState("");

  const handleFeedback = async (e) => {
    e.preventDefault();
    const newFeedback = {
      rating,
      comment,
      orderID,
    };

    try {
      await axios.post("/feedback/", newFeedback);

      Store.addNotification({
        title: "Feedback Saved Successfully",
        message: "Thank you for your feedback",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 1500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      alert(err);
    }
  };

  const toggle = (_id) => {
    setOrderID(_id);
    setModal(!modal);
  };
  useEffect(() => {
    const { email } = auth.user;
    console.log("63", email);
    axios
      .get(`/orders/${email}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.user]);

  //rating
  const ratings = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "red",
    value: 7.5,
    a11y: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setRating(newValue);
    },
  };

  //get all feedbacks
  const [feedback, setFeedbacks] = useState([]);
  const [rate, setRate] = useState(0);
  useEffect(() => {
    axios
      .get("/feedback/")

      .then((res) => {
        setFeedbacks(res.data);
        setRate(res.data.rating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="mt-4 container">
        <div style={{ position: "absolute", zIndex: "704" }}></div>
        <div style={{ textAlign: "center" }}>
          <i class="cart icon "></i>
        </div>
        <h1 style={{ textAlign: "center" }}>
          <b>My Orders</b>
        </h1>

        <div className="mt-5" style={{ marginLeft: "15%" }}>
          {orders?.map((orderData, index) => (
            <div
              className="card mb-2 container"
              key={index}
              style={{ backgroundColor: "#FBFDF3" }}
            >
              <div className="row g-0 ">
                <div className="col-md-2">
                  <img
                    // src={orderData.image.url}
                    className="img mt-2"
                    style={{ height: "60%", width: "80%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div>
                      <h4 className="card-title">
                        <b>{orderData.serviceTitle}</b>
                      </h4>
                    </div>
                    <br></br>

                    {orderData.orderStatus === "pending" ? (
                      <h5>
                        <b>
                          Status:
                          <span style={{ backgroundColor: "yellow" }}>
                            Pending{" "}
                          </span>
                        </b>
                      </h5>
                    ) : (
                      <div></div>
                    )}
                    {orderData.orderStatus === "accept" ? (
                      <h5>
                        <b>
                          Status:
                          <span style={{ backgroundColor: "green" }}>
                            Accept{" "}
                          </span>
                        </b>
                      </h5>
                    ) : (
                      <div></div>
                    )}

                    {orderData.orderStatus === "reject" ? (
                      <h5>
                        <b>
                          Status:
                          <span style={{ backgroundColor: "red" }}>
                            Reject{" "}
                          </span>
                        </b>
                      </h5>
                    ) : (
                      <div></div>
                    )}
                    <div>
                      {feedback?.map((feedbackData, index) => (
                        <div>
                          {feedbackData.orderID === orderData._id ? (
                            <div>
                              <h5>
                                <b>
                                  <ReactStars
                                    {...{
                                      size: 20,
                                      value: feedbackData.rating,
                                      edit: false,
                                    }}
                                  />
                                </b>
                              </h5>
                              <h6>{feedbackData.comment}</h6>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="extra content">
                      <div
                        className="ui two buttons"
                        style={{ marginLeft: "40%" }}
                      >
                        <tr>
                          <td>
                            <button
                              class="ui button mb-2"
                              style={{
                                marginLeft: "50px",
                                backgroundColor: "#1E1E1E",
                                color: "white",
                              }}
                              onClick={() => toggle(orderData._id)}
                            >
                              LEAVE FEEDBACK
                            </button>
                          </td>
                        </tr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        class="modal fade"
        id="feedback"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* Popup modal */}
        <Modal
          centered
          size="lg"
          isOpen={modal}
          toggle={() => setModal(!modal)}
        >
          <ModalHeader toggle={() => setModal(!modal)}>
            <h5>Feedback</h5>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label>Title: </label>
                <div className="rating">
                  <ReactStars {...ratings} />
                </div>
              </div>
              <div className="form-group">
                <label>Comment: </label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              data-bs-dismiss="modal"
              // onClick={() => handleDelete(noteid)}
            >
              <i className="fas fa-trash-alt"></i>&nbsp;Delete
            </button>

            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              onClick={(e) => handleFeedback(e)}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
