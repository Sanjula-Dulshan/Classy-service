import React from "react";
import "./sideBar.css";

export default function Sidebar() {
  return (
    <div>
      <div>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white "
        >
          <div className="position-sticky">
            <nav class="navbar navbar-light bg-light">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ marginLeft: "8%" }}
                />
              </form>
              <hr></hr>
            </nav>
            <div className="list-group list-group-flush mx-3 mt-4">
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple  "
              >
                <i className="fas fa-wrench fa-fw me-3"></i>
                <span>Technicians</span>
              </a>

              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple   "
              >
                <i className="fas fa-car fa-fw me-3"></i>

                <span>Vehicles</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple  "
              >
                <i className="fas fa-laptop fa-fw me-3"></i>
                <span>IT</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple   "
              >
                <i className="fas fa-cogs fa-fw me-3"></i>
                <span>Professional</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple  "
              >
                <i className="fas fa-print fa-fw me-3"></i>
                <span>Printing</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple   "
              >
                <i className="fas fa-home fa-fw me-3"></i>
                <span>House</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple  "
              >
                <i className="fas fa-users fa-fw me-3"></i>
                <span>Beauty & Events</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
