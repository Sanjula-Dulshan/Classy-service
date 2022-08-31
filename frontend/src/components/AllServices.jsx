import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function () {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8070/services/")

      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="ui cards mt-4 container" style={{ marginLeft: "10%" }}>
      {services.map((data, index) => (
        <div class="card" key={index} style={{ backgroundColor: "#FBFDF3" }}>
          <div class="content">
            <i class="heart icon right floated"></i>
            <img
              class="left floated ui image"
              style={{ height: "60px", width: "70px" }}
              src={data.image.url}
            />

            <div class="header">
              <b>{data.title}</b>
            </div>
            <div class="meta">{data.location}</div>
            <i class="bi bi-telephone ">{data.phone}</i>
          </div>
          <div class="extra content">
            <div class="ui two buttons" style={{ marginLeft: "10%" }}>
              <tr>
                <td>
                  <div
                    class="ui button"
                    style={{ backgroundColor: "#FEA82F", color: "black" }}
                  >
                    Buy
                  </div>
                </td>
                <td>
                  <div
                    class="ui button"
                    style={{
                      marginLeft: "50px",
                      backgroundColor: "#423E3B",
                      color: "white",
                    }}
                  >
                    View
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
