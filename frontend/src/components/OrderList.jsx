import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import ConfirmBox from "react-dialog-confirm";
import Sidebar from "./Sidebar";

export default function OrderList() {
  return (
    <div>
      <Sidebar />
      <div className="mt-4 container">
        {/* <div style={{ position: "absolute", zIndex: "704" }}>
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
        </div> */}
        <div style={{ textAlign: "center" }}>
          <i class="cart icon "></i>
        </div>
        <h1 style={{ textAlign: "center" }}>
          <b>My Orders</b>
        </h1>

        <div className="mt-5" style={{ marginLeft: "15%" }}>
          <div
            className="card mb-2 container"
            style={{ backgroundColor: "#FBFDF3" }}
          >
            <div className="row g-0 ">
              <div className="col-md-2">
                <img
                  src=""
                  className="img mt-2"
                  style={{ height: "90%", width: "90%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <b>gtyyyygf</b>
                  </h5>
                  <p className="card-text d-flex justify-content-between align-items-center">
                    <b>Status:</b>
                    <div className="extra content">
                      <div
                        className="ui two buttons"
                        style={{ marginLeft: "40%" }}
                      >
                        <tr>
                          <td>
                            <Link
                              className="ui button"
                              to={""}
                              style={{
                                backgroundColor: "#1E1E1E",
                                color: "white",
                              }}
                            >
                              LEAVE FEEDBACK
                            </Link>
                          </td>
                          {/* <td>
                            <button
                              class="ui button mb-2"
                              style={{
                                marginLeft: "50px",
                                color: "red",
                              }}
                              //   onClick={() => confirm(data._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td> */}
                        </tr>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
