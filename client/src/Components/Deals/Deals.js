import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Deals = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      {loggedInUser.email ? (
        <h1> The Best Deals are Coming for you 😍 </h1>
      ) : (
        <div>
          <h1 style={{ color: "red" }}> SORRY!!</h1>
          <h1> Only Logged in Users can access this</h1>
          <br />
          <Link to="/login">
            {" "}
            <button className="btn btn-outline-success">
              {" "}
              Please log in first
            </button>{" "}
          </Link>
        </div>
      )}
      <br />
      <Link to="/home">
        {" "}
        <button className="btn btn-primary"> Back to Home </button>{" "}
      </Link>
    </div>
  );
};

export default Deals;
