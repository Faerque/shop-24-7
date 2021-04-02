import React from "react";
import { useHistory } from "react-router-dom";

const Products = (props) => {
  const { _id, imageURL, name, price, weight } = props.product;

  const history = useHistory();

  const handleNext = (_id) => {
    history.push(`/checkout/${_id}`);
  };

  return (
    <div className="col-md-4">
      <div className="card" style={{ width: "18rem" }}>
        <img style={{ height: "300px" }} src={imageURL} alt="" />
        <div className="card-body">
          <h3 class="card-title">
            {name} - {weight}
          </h3>
          <h4 class="card-text">Price: ${price} </h4>
          <button
            onClick={() => handleNext(_id)}
            class="btn btn-outline-success"
          >
            {" "}
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
