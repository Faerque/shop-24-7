import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5055/orders?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  return (
    <div className="card text-white bg-dark mb-5">
      <div className="card-header">
        {" "}
        <h3>
          {" "}
          {loggedInUser.name} you have {orders.length} Order/s{" "}
        </h3>{" "}
      </div>
      <div className="card-body card-title ">
        {orders.map((order) => (
          <h3>
            Product Name: <br /> {order.name} - {order.weight}
            <br /> <small> Quantity: 1 </small> <br /> <br /> Price: $
            {order.price} <br />
            <br />{" "}
            <small>
              Picking Up date: <br />
              {new Date(order.pickedDate).toDateString("dd/MM/yyyy")}{" "}
            </small>{" "}
            <br />{" "}
          </h3>
        ))}
        <p className="card-text text-muted">
          We Deliver the products by your given dates. But it may got delay due
          to a reason{" "}
        </p>
        <Link to="/home">
          {" "}
          <button className="btn btn-primary"> Back to Home </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Orders;
