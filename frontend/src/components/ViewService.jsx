import React from "react";

export default function ViewService() {
  return (
    <div>
      <div className="mt-5 ">
        <i
          class="fas fa-arrow-circle-left"
          style={{ fontSize: "22px", marginLeft: "15%" }}
        >
          Back
        </i>
        <form
          className="container mt-5"
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
          <div className="extra content">
            <div
              className="card mb-3 container"
              style={{ width: "45%", height: "25%" }}
            >
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src="..."
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                  </div>
                  <div class="ui button">Buy</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
