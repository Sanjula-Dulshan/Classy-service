import React from "react";

export default function ViewService() {
  return (
    <div>
      <div className="mt-5 ">
        <a href="#">
          <i
            class="fas fa-arrow-circle-left"
            style={{ fontSize: "22px", marginLeft: "15%", color: "#FEA82F" }}
          >
            Back
          </i>
        </a>
        <form
          className="container mt-5 pb-4 shadow-lg p-3 mb-5 bg-white rounded"
          style={{ backgroundColor: "#FBFDF3", marginLeft: "15%" }}
        >
          <div>
            <h4>
              <b>Service Name</b>
            </h4>
          </div>
          <hr></hr>
          <div>
            <i
              className="fa-solid fas fa-phone-alt "
              style={{ fontSize: "18px" }}
            >
              {" "}
              Num
            </i>
          </div>
          <br></br>
          <h5>
            <b>Location :</b> fffffffffff
          </h5>
          <br></br>

          <h5>
            <b>Category :</b>dddddddd
          </h5>
          <br></br>
          <h5>
            <b>Fee :</b>dddddddd
          </h5>
          <br></br>
          <h5>
            <b>Description :</b>dddddddd
          </h5>
          <br></br>
          <br></br>
          <div className="extra content ">
            <div
              className="card mb-3 container pb-3 shadow-lg p-3 mb-5 bg-white rounded"
              style={{ width: "45%", height: "25%" }}
            >
              <div className="row g-0">
                <div className="col-md-2 mt-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="rounded-circle shadow-4"
                    style={{ height: "80%", width: "80%" }}
                    alt="Avatar"
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>Card title</b>
                    </h5>
                  </div>
                  <div
                    class="ui button"
                    style={{
                      backgroundColor: "#FEA82F",
                      color: "black",
                      marginLeft: "8%",
                    }}
                  >
                    View Profile
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
