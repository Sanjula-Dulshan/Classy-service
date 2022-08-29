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
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            required
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            required
            rows="5"
          />
        </div>
        <div className="row ">
          <label htmlFor="categories">Categories: </label>
          <select name="category" className="form-control">
            <option value="">Please select a category</option>
          </select>
        </div>

        <div className="row">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            id="location"
            required
          />
        </div>

        <div className="row">
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            name="fee"
            className="form-control"
            id="fee"
            required
          />
        </div>

        <div className="flex_box">
          <button type="submit" className="btn btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn btn-create">
            {onEdit ? "Update" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
