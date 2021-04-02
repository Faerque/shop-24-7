import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../Products/Products";

const Home = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5055/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="row">
      {loading ? (
        <div
          className="spinner-border"
          style={{ marginLeft: "48%", width: "3rem", height: "3rem" }}
          role="status"
        ></div>
      ) : (
        product.map((product) => <div style={{margin:'2%' }}> <Products product={product}> </Products> </div> )
      )}
    </div>
  );
};

export default Home;
