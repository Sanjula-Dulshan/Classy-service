import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./utils/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserAllServices() {
  const auth = useSelector((state) => state.auth);

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
  });

  const handleDelete = async (id, public_id) => {
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

  const handleEdit = (id) => {
    navigate(`/editService/${id}`);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <div
        className="ui cards mt-4 container"
        style={{ marginLeft: "10%", marginBottom: "30px" }}
      >
        {services?.map((data, index) => (
          <div
            className="card"
            key={index}
            style={{ backgroundColor: "#FBFDF3" }}
          >
            <div className="content">
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
                        handleDelete(data._id, data.image.public_id)
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
  );
}
