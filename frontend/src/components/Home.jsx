import React from "react";
import "./home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <div>
      <div className="container-fluid banner">
        <div className="row">
          <div className="col-md-8 offset-md-2 info">
            <h1 className="text-center">CLASSY SERVICES</h1>
            <p className="text-center">
              We are a team of professionals who are passionate about providing
              quality services to our clients. We are here to help you with your
              daily needs.Choose from a wide range of services and get the best
              deals.
            </p>
            {isLogged ? (
              <div>
                <a href="/allServices" className="btn btn-md text-center">
                  GET STARTED
                </a>
              </div>
            ) : (
              <div>
                <a href="/login" className="btn btn-md text-center">
                  GET STARTED
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
