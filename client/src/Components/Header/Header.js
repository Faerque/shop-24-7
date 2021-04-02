import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

// import { Button as button, Nav as nav } from 'react-bootstrap';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul class="nav">
          <li class="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link class="nav-link" to="/orders">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/deals">
              Best Deals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
          <li className="nav-item d-flex">
            {loggedInUser.email ? (
              <button
                className="btn btn-outline-danger text-dark ml-1"
                onClick={() => setLoggedInUser({})}
              >
                Sign Out {loggedInUser.name}
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-outline-success text-dark ml-1">
                  Sign In
                </button>
              </Link>
            )}
          </li>
        </ul>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <Link to="/home">
            {" "}
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>{" "}
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
