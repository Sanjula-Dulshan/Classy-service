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

export default function UserAllServices() {
  const auth = useSelector((state) => state.auth);

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteAll, setIsOpenDeleteAll] = useState(false);

  const [id, setId] = useState();
  const [publicId, setPublicId] = useState();
  const [isCheck, setIsCheck] = useState(false);

  const confirm = (id, public_id) => {
    setIsOpen(true);

    setId(id);
    setPublicId(public_id);
  };

  const confirmDeleteAll = () => {
    setIsOpenDeleteAll(true);
  };

  const handleDelete = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post("/image/destroy", { public_id });
      const deleteService = axios.delete(`/services/${id}`);

      await destroyImg;
      await deleteService;
      setLoading(false);
      setIsOpen(false);
      Store.addNotification({
        title: "Service Deleted Successfully",

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
    }
  };

  const handleDeleteAll = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post("/image/destroy", { public_id });
      const deleteService = axios.delete(`/services/${id}`);

      await destroyImg;
      await deleteService;
      setLoading(false);
      setIsOpenDeleteAll(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    setIsOpenDeleteAll(false);
  };

  const handleCloseDeleteAll = () => {
    setIsOpenDeleteAll(!isOpenDeleteAll);
  };

  useEffect(() => {
    const { email } = auth.user;
    axios
      .get(`/services/${email}`)

      .then((res) => {
        setServices(res.data);
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

  const handleEdit = (id) => {
    navigate(`/editService/${id}`);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  const handleCheck = (id) => {
    services.forEach((service) => {
      if (service._id === id) service.checked = !service.checked;
    });
    setServices([...services]);
  };

  const checkAll = () => {
    services.forEach((service) => {
      service.checked = !isCheck;
    });
    setServices([...services]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    services
      .forEach((service) => {
        if (service.checked) {
          handleDeleteAll(service._id, service.image.public_id);
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

  const filterData = (data, searchkey) => {
    const result = data.filter(
      (service) =>
        service.title.toLowerCase().includes(searchkey) ||
        service.title.toLowerCase().includes(searchkey)
    );

    setServices(result);
  };

  function hancdleSearchArea(e) {
    const { email } = auth.user;
    const searchKey = e.currentTarget.value;

    axios.get(`/services/${email}`).then((res) => {
      filterData(res.data, searchKey);
      console.log("res.data", res.data);
    });
  }

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
              onConfirm={() => {
                handleDelete(id, publicId);
              }}
              onCancel={handleClose}
            />
          </div>

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
          <div>
            <tr className=" float-end">
              <td>
                <div className="no-search">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="search"
                    name="search"
                    onChange={hancdleSearchArea}
                  />
                </div>
              </td>
              <td>
                <div className="delete-all">
                  <span>Select all</span>
                  <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={checkAll}
                  />

                  <button onClick={confirmDeleteAll}>Delete ALL</button>
                </div>
              </td>
            </tr>
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
                  <input
                    type="checkbox"
                    checked={data.checked}
                    onChange={() => handleCheck(data._id)}
                  />
                  <div className="header mt-2 mb-4">
                    <b>{data.title}</b>
                  </div>
                  <div className="mb-2">{truncate(data?.description, 75)}</div>
                  <i className=" ">
                    <span className="fw-bold ">Fee: </span>Rs.
                    {data.fee}
                  </i>
                </div>
                <div className="extra content">
                  <div className="ui two buttons" style={{ marginLeft: "10%" }}>
                    <tr>
                      <td>
                        <div
                          className="ui button"
                          style={{ backgroundColor: "#FEA82F", color: "black" }}
                          onClick={() => handleEdit(data._id)}
                        >
                          Edit
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
                          onClick={() =>
                            confirm(data._id, data.image.public_id)
                          }
                        >
                          Delete
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
