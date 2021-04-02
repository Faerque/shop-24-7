import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faMedal,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [products, setProducts] = useState({});
  useEffect(() => {
    const url = `http://localhost:5055/products/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [id]);

  const [selectedDate, setSelectedDate] = useState({
    pickedDate: new Date(),
  });

  const handleDateChange = (date) => {
    const newDates = { ...selectedDate };
    newDates.pickedDate = date;
    setSelectedDate(newDates);
  };

  const productsDetails = {
    name: products.name,
    price: products.price,
    weight: products.weight,
  };

  const handleChecking = () => {
    const newChecking = {
      ...loggedInUser,
      ...selectedDate,
      ...productsDetails,
    };
    fetch("http://localhost:5055/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChecking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1> Checkout Products </h1>

      <br />

      <div class="card mb-4" style={{ maxwidth: "540px" }}>
        <div class="row g-0">
          <div class="col-md-4">
            {loading ? (
              <div
                className="spinner-border"
                style={{
                  marginLeft: "45%",
                  marginTop: "40%",
                  width: "3rem",
                  height: "3rem",
                }}
                role="status"
              >
                {" "}
              </div>
            ) : (
              <img
                style={{ width: "400px", borderRadius: "5px" }}
                src={products.imageURL}
                alt="..."
              ></img>
            )}
          </div>

          <div class="col-md-8">
            <div className="card-header ">
              <h3> Product Description </h3>
            </div>

            <div class="card-body">
              <h4 class="card-title">{products.name}</h4>

              <h5> {products.weight} </h5>

              <p class="card-text">
                <small class="text-muted">
                  {" "}
                  <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon> Quantity 1
                </small>
                <br />
                <small class="text-muted">
                  {" "}
                  <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon> Original
                  Product
                </small>
              </p>

              <p class="card-text">
                This Product {products.name} directly came from factory.And
                Shop-24 giving you the best {products.name} within shorten time.
              </p>

              <h3> Price: ${products.price} </h3>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Please ensure a pick up date"
                    value={selectedDate.pickedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Link to="/orders">
                <button
                  className="btn btn-outline-success"
                  style={{ marginLeft: "58%" }}
                  type="submit"
                  onClick={handleChecking}
                >
                  {" "}
                  <FontAwesomeIcon icon={faShoppingBag}> </FontAwesomeIcon>{" "}
                  Proceed to Checkout{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
