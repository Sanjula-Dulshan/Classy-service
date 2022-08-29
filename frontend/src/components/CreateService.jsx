import React, { useState } from "react";
import axios from "axios";
import Loading from "./utils/loading/Loading";
import "./createService.css";

export default function CreateService() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  //image upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      console.log("e.target", e.target.files[0]);
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 5 * 1024 * 1024)
        // 5mb
        return alert("Maximum file size: 5MB");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Please upload only jpeg/png");

      let formData = new FormData();
      console.log("formData", formData);
      formData.append("file", file);
      console.log("formData.append", formData);

      setLoading(true);
      const res = await axios.post("/image/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setLoading(false);
      setImage(res.data);
      console.log("res", res);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  //delete image on cloudinary
  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post("/image/destroy", { public_id: image.public_id });
      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };
  return (
    <div className="create_service">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
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
