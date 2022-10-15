import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

function NotFoundContent() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">NO DATA</h1>
            <p className="fs-3">
              {" "}
              <span className="text-danger">Opps!</span> Data not found.
            </p>
            <p className="lead">You have not added details required yet.</p>
            <a href="/addbank" className="btn btn-warning">
              Add Bank Details
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotFoundContent;
