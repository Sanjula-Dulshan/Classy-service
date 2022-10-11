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
import { useSelector } from "react-redux";
import { Store } from "react-notifications-component";

export default function Wishlist() {
  const auth = useSelector((state) => state.auth);
  const [wishlist, setWishlist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();

  const confirm = (id) => {
    setIsOpen(true);
    setId(id);
  };

  useEffect(() => {
    const { email } = auth.user;
    console.log(email);
    axios

      .get(`/wishlist/${email}`)
      .then((res) => {
        setWishlist(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.user]);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const onDelete = (_id) => {
    axios
      .delete(`/wishlist/${_id}`)

      .then((res) => {
        console.log(res);
        setIsOpen(false);
        Store.addNotification({
          title: "Removed from wishlist successfully",
          message: "Product removed from wishlist",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate_animated", "fadeIn"],
          animationOut: ["animate_animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
          width: 400,
        });
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = (data) => {
    let { title, fee, userEmail, serviceProviderEmail, image } = data;

    localStorage.setItem("title", title);

    localStorage.setItem("fee", fee);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("serviceProviderEmail", serviceProviderEmail);

    localStorage.setItem("image", image.url);
    localStorage.setItem("public_id", image.public_id);

    console.log(data);
  };

  return (
    <div>
      <Sidebar />
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
        <div style={{ textAlign: "center" }}>
          <i className="heart icon "></i>
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
              {console.log(data)}
              <div className="row g-0 ">
                <div className="col-md-2">
                  <img
                    src={data.image.url}
                    className="img mt-2"
                    style={{ height: "90%", width: "90%" }}
                    alt="..."
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
                              <Link
                                className="ui button"
                                to={"/checkout"}
                                style={{
                                  backgroundColor: "#FEA82F",
                                  color: "black",
                                }}
                                onClick={() => setData(data)}
                              >
                                Buy
                              </Link>
                            </td>
                            <td>
                              <button
                                className="ui button mb-2"
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
                    <p className="card-text">Price: {data.fee}</p>
                    <p className="card-text">
                      <i className="bi bi-telephone ">{data.phone}</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
