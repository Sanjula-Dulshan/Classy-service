import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./utils/loading/Loading";
import { Link } from "react-router-dom";

export default function UserAllServices() {
  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);

  const deleteService = async (id, public_id) => {
    console.log("deleteService", id, public_id);
    try {
      setLoading(true);
      const destroyImg = axios.post("/image/destroy", { public_id });
      const deleteService = axios.delete(`/services/${id}`);

      await destroyImg;
      await deleteService;

      setLoading(false);
      window.location.reload(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    axios
      .get("/services")

      .then((res) => {
        setServices(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="ui cards mt-4 container" style={{ marginLeft: "10%" }}>
      {services?.map((data, index) => (
        <div
          className="card"
          key={index}
          style={{ backgroundColor: "#FBFDF3" }}
        >
          {console.log("data", data)}
          <div className="content">
            <div className="header mt-2 mb-4">
              <b>{data.title}</b>
            </div>
            <div className="mb-2">{data.description}</div>
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
                  >
                    <Link id="btn_view" to={`/editService/${data._id}`}>
                      Edit
                    </Link>
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
                      deleteService(data._id, data.image.public_id)
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
  );
}
