import React, { useState } from "react";
import Loading from "./utils/loading/Loading";
import "./createService.css";

export default function CreateService() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  const styleUpload = {
    display: image ? "block" : "none",
  };
  return (
    <div className="create_service">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span>X</span>
          </div>
        )}
      </div>

      <form>
        <div className="row mt-4">
          <div className="col">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              id="description"
              required
              rows="5"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="categories" className="form-label">
              Categories:{" "}
            </label>
            <select name="category" className="form-control">
              <option value="">Please select a category</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              id="location"
              required
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label htmlFor="fee" className="form-label">
              Fee
            </label>
            <input
              type="number"
              name="fee"
              className="form-control"
              id="fee"
              required
            />
          </div>

          <div className="col">
            <label
              htmlFor="location"
              className="form-label"
              style={{ visibility: "hidden" }}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              id="location"
              style={{ visibility: "hidden" }}
              required
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <div className="form-check">
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I need buyer’s address to provide the service
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I need the date and time to deliver my service{" "}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <label htmlFor="description" className="form-label fw-bolder ">
              I accept payment by:
            </label>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                I need the date and time to deliver my service{" "}
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                I need the date and time to deliver my service{" "}
              </label>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col flex_box">
            <button type="submit" className="btn btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-create">
              {onEdit ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
