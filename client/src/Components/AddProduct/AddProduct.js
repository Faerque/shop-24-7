import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faPlus,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();

  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.Name,
      price: data.Price,
      weight: data.Weight,
      imageURL: imageURL,
    };
    const url = `http://localhost:5055/addProduct`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => console.log("Server Side Response"));

    console.log(productData);

    console.log(data);
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "91b4840911bc2eccb83a38fe07749f06");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-around">
      <div className="card bg-dark col-md-4">
        <div className="card-header "><span style={{color: 'white'}} > Admin Features </span></div>
        <div className="list-group list-group-flush">
          <Link to="/manageProducts">
            {" "}
            <button
              className="btn btn-outline-primary"
              style={{ margin: "5%" }}
            >
              {" "}
              <FontAwesomeIcon icon={faGripHorizontal}></FontAwesomeIcon> Manage
              Products
            </button>
          </Link>
          <Link to="/admin">
            {" "}
            <button
              className="btn btn-outline-success"
              style={{ margin: "5%" }}
            >
              {" "}
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Products
            </button>
          </Link>
          <Link to="/manageProducts">
            {" "}
            <button
              className="btn btn-outline-success"
              style={{ margin: "5%" }}
            >
              {" "}
              <FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon> Edit
              Products
            </button>
          </Link>
        </div>
      </div>
      <br />
      <div
        className="col-md-4"
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h3> Add your Products here </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="Name"
            placeholder="Enter Name"
            ref={register({ required: true })}
          />

          <p> Product Name </p>

          <input
            name="Price"
            placeholder="Enter Price"
            ref={register({ required: true })}
          />

          <p> Add Price </p>

          <input
            name="Weight"
            placeholder="Enter Weight"
            ref={register({ required: true })}
          />

          <p> Weight </p>

          <input
            name="Image"
            type="file"
            ref={register({ required: true })}
            onChange={handleImageUpload}
          />

          <br />
          <br />
          <input className="btn btn-outline-success" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
