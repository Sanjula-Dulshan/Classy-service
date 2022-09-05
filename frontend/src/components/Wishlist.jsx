import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8070/wishlist/")
      .then((res) => {
        setWishlist(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = (_id) => {
    axios.delete(`http://localhost:8070/wishlist/${_id}`);
    window.location
      .reload()

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirm = (_id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "You won't be able to revert this!",

      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="mt-4 container">
      <div style={{ textAlign: "center" }}>
        <i class="heart icon "></i>
      </div>
      <h1 style={{ textAlign: "center" }}>
        <b>My WishList</b>
      </h1>

      <div className="mt-5" style={{ marginLeft: "15%" }}>
        {wishlist.map((data, index) => (
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
                  <h5 className="card-title">
                    <b>{data.title}</b>
                  </h5>
                  <p className="card-text d-flex justify-content-between align-items-center">
                    {data.description}
                    <div className="extra content">
                      <div
                        className="ui two buttons"
                        style={{ marginLeft: "40%" }}
                      >
                        <tr>
                          <td>
                            <div
                              className="ui button"
                              style={{
                                backgroundColor: "#FEA82F",
                                color: "black",
                              }}
                            >
                              Buy
                            </div>
                          </td>
                          <td>
                            <button
                              class="ui button mb-2"
                              style={{
                                marginLeft: "50px",
                                color: "red",
                              }}
                              onClick={() => confirm(data._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      </div>
                    </div>
                  </p>

                  <p className="card-text">
                    <i class="bi bi-telephone ">{data.phone}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
