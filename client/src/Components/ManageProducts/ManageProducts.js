import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faPlus,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5055/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);

  const deleteProduct = (id) => {
    fetch(`http://localhost:5055/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  };

  return (
    <div className="justify-content-around" >
      <div className="card bg-dark col-md-3">
        <div className="card-header "> <span style={{color: 'white'}} > Admin Features </span> </div>
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
      <br/>
      {products.map((product) => (
        <div className="card" style={{ margin: '5px'}}> 
        <div className="card-body" product={product}>
          {" "}
         <strong> Name: {product.name}{" "} </strong>
          <br/>
          <br/>
    
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteProduct(product._id)}
          >
            {" "}
            Delete Product{" "}
          </button>{" "}
          
        </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
