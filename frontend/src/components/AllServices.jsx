import React from "react";

const AllServices = () => (
  <div className="mt-4 " style={{ marginLeft: "10%" }}>
    <div className="ui cards">
      <div className="card">
        <div className="content">
          <i className="heart icon right floated"></i>
          <img className="left floated mini ui image" src="" />
          <div className="header">Elliot Fu</div>
          <div className="meta">Friends of Veronika</div>
          <div className="description">
            {" "}
            Elliot requested permission to view your contact details
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons ">
            <tr>
              <td>
                <div className="ui basic green button">Approve</div>
              </td>
              <td>
                <div
                  className="ui basic red button"
                  style={{ marginLeft: "50px" }}
                >
                  {" "}
                  Decline
                </div>
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AllServices;
