import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import "../components/ratings/rstyle.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders/")
      .then((res) => {
        setOrders(res.data);
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
          {console.log("orders", orders)}
          {orders?.map(
            (data, index) => (
              console.log("41", data),
              (
                <div
                  className="card mb-2 container"
                  key={index}
                  style={{ backgroundColor: "#FBFDF3" }}
                >
                  <div className="row g-0 ">
                    <div className="col-md-2">
                      <img
                        src={data.image.url}
                        className="img mt-2"
                        style={{ height: "90%", width: "90%" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title">
                          <b>{data.serviceTitle}</b>
                        </h4>
                        <br></br>

                        {data.orderStatus === "pending" ? (
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
                        {data.orderStatus === "accept" ? (
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

                        {data.orderStatus === "reject" ? (
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
                                  //   onClick={() => confirm(data._id)}
                                >
                                  LEAVE FEEDBACK
                                </button>
                              </td>
                            </tr>
                          </div>
                        </div>

                        {/* <section>
                          <div class="rt-container">
                            <div class="col-rt-12">
                              <form>
                                <fieldset>
                                  <span class="star-cb-group">
                                    <input
                                      type="radio"
                                      id="rating-5"
                                      name="rating"
                                      value="5"
                                    />
                                    <label for="rating-5">5</label>
                                    <input
                                      type="radio"
                                      id="rating-4"
                                      name="rating"
                                      value="4"
                                      checked="checked"
                                    />
                                    <label for="rating-4">4</label>
                                    <input
                                      type="radio"
                                      id="rating-3"
                                      name="rating"
                                      value="3"
                                    />
                                    <label for="rating-3">3</label>
                                    <input
                                      type="radio"
                                      id="rating-2"
                                      name="rating"
                                      value="2"
                                    />
                                    <label for="rating-2">2</label>
                                    <input
                                      type="radio"
                                      id="rating-1"
                                      name="rating"
                                      value="1"
                                    />
                                    <label for="rating-1">1</label>
                                    <input
                                      type="radio"
                                      id="rating-0"
                                      name="rating"
                                      value="0"
                                      class="star-cb-clear"
                                    />
                                    <label for="rating-0">0</label>
                                  </span>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                        </section> */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
