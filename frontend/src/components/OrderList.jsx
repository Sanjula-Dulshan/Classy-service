import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Store } from "react-notifications-component";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ConfirmBox from "react-dialog-confirm";
import RiseLoader from "react-spinners/RiseLoader";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./ratings/rstyle.css";
import generatePDF from "./MyOrderReport";

import Sidebar from "./Sidebar";

const initialState = {
  rating: 0,
  comment: "",
};
export default function OrderList() {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [review, setReview] = useState(initialState);
  const [modal, setModal] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [feedback, setFeedbacks] = useState([]);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateID, setUpdateID] = useState("");

  const [onEdit, setOnEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { email } = auth.user;

    axios
      .get(`/orders/${email}`)
      .then((res) => {
        setOrders(res.data);
        console.log("res.data: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.user, loading]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/feedback/")

        .then((res) => {
          setFeedbacks(res.data);
          setRate(res.data.rating);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    if (onEdit) {
      feedback.forEach((feedbackData) => {
        if (feedbackData._id === updateID) {
          setReview(feedbackData);

          console.log("feedback ", feedbackData);
        }
      });
    }
  }, [loading, onEdit]);
  const handleChangeInput = (e) => {
    console.log("e.target: ", e.target);
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const confirm = (feedbackID, orderID) => {
    setIsOpen(true);
    setId(feedbackID);
    setOrderID(orderID);
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/feedback/", { ...review, orderID }).then((res) => {
        axios.patch(`/orders/feedback/${orderID}`, {
          feedbackStatus: true,
        });
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

        setModal(false);
        setLoading(false);
        setOnEdit(false);
        //window.location.reload(false);
      });
    } catch (err) {
      alert(err);
    }
  };

  const toggle = (_id) => {
    setOrderID(_id);
    setModal(!modal);
  };

  //rating
  const ratings = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "red",
    value: review.rating,

    a11y: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,

    onChange: (newValue) => {
      setReview({ ...review, rating: newValue });
    },
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const onDelete = async (_id) => {
    try {
      setLoading(true);

      await axios
        .delete(`/feedback/${_id}`)

        .then((res) => {
          console.log("145", orderID);

          axios.patch(`/orders/feedback/${orderID}`, {
            feedbackStatus: false,
          });

          console.log(res);
          setIsOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const toggleEdit = (_id) => {
    setUpdateID(_id);
    setOnEdit(true);
    setModal(!modal);
  };

  //update feedback
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(`/feedback/${updateID}`, review).then(() => {
        Store.addNotification({
          title: "Feedback Updated Successfully",
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
      });
      setModal(false);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleCancel = () => {
    setModal(false);
    setOnEdit(false);
    setReview(initialState);
  };

  return (
    <div>
      <Sidebar />
      {loading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
        <div>
          <div className="report">
            <button onClick={() => generatePDF(orders)}>
              Download My Orders
            </button>
          </div>
          <div className="mt-4 container">
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
                onConfirm={() => {
                  onDelete(id);
                }}
                onCancel={handleClose}
              />
            </div>
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
                        {orderData.orderStatus === "accept" ? (
                          <div>
                            {orderData.feedbackStatus ? (
                              <div>
                                {feedback?.map((feedbackData, index) => (
                                  <div key={index}>
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
                                                    backgroundColor: "#FEA82F",
                                                    color: "white",
                                                  }}
                                                  onClick={() =>
                                                    toggleEdit(feedbackData._id)
                                                  }
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faEdit}
                                                  />
                                                </button>
                                              </td>
                                              <td>
                                                <button
                                                  class="ui button mb-2"
                                                  style={{
                                                    marginLeft: "50px",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                  }}
                                                  onClick={() =>
                                                    confirm(
                                                      feedbackData._id,
                                                      orderData._id
                                                    )
                                                  }
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faTrash}
                                                  />
                                                </button>
                                              </td>
                                            </tr>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
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
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
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
                {onEdit ? (
                  <div>
                    <h5>Update Feedback</h5>
                  </div>
                ) : (
                  <div>
                    <h5>Add Feedback</h5>
                  </div>
                )}
              </ModalHeader>

              <ModalBody>
                <form>
                  <div className="form-group">
                    <label>Title: </label>
                    <div className="rating">
                      {console.log("rating: ", review.rating)}

                      <ReactStars
                        {...{
                          size: 20,
                          value: review.rating,
                          edit: false,
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Comment: </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="comment"
                      value={review.comment}
                      onChange={handleChangeInput}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  <i className=""></i>&nbsp;Cancel
                </button>

                {onEdit ? (
                  <div>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={(e) => handleFeedback(e)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </ModalFooter>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
