import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist() {
  return (
    <div className="mt-4">
      <div style={{ textAlign: "center" }}>
        <i class="heart icon "></i>
      </div>
      <h1 style={{ textAlign: "center" }}>
        <b>My WishList</b>
      </h1>

      <div className="mt-5" style={{ marginLeft: "25%" }}>
        <div
          className="card mb-3"
          style={{ maxWidth: "740px", backgroundColor: "#FBFDF3" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img src="..." className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text d-flex justify-content-between align-items-center">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                  <div className="ui two buttons" style={{ marginLeft: "10%" }}>
                    <tr>
                      <td>
                        <div
                          className="ui button"
                          style={{ backgroundColor: "#FEA82F", color: "black" }}
                        >
                          Buy
                        </div>
                      </td>
                      <td>
                        <button
                          class="btn mb-2"
                          style={{
                            marginLeft: "50px",
                            color: "red",
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  </div>
                </p>

                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
