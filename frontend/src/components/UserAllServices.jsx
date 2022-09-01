import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserAllServices() {
  const [services, setServices] = useState();

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

  return (
    <div className="ui cards mt-4 container" style={{ marginLeft: "10%" }}>
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
