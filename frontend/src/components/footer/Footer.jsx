import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-basic">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li className="list-inline-item">
              <a href="#">About</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p className="copyright">Company Name © 2018</p>
        </div>
      </footer>
    </div>
  );
}
