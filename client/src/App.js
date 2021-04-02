import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import AddProduct from "./Components/AddProduct/AddProduct";
import CheckOut from "./Components/Checkout/CheckOut";
import Deals from "./Components/Deals/Deals";
import Login from "./Components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Orders from "./Components/Orders/Orders";
import ManageProducts from "./Components/ManageProducts/ManageProducts";
import Footer from "./Components/Footer/Footer";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
        <Router>
          <Header />
          <div className="container bg-light mt-4 p-4">
            <Switch>
              <Route path="/header"></Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home> </Home>
              </Route>
              <Route path="/deals">
                <Deals> </Deals>
              </Route>
              <Route path="/login">
                <Login> </Login>
              </Route>
              <PrivateRoute path="/admin">
                <AddProduct> </AddProduct>
              </PrivateRoute>
              <PrivateRoute path="/manageProducts">
                <ManageProducts> </ManageProducts>
              </PrivateRoute>
              <PrivateRoute path="/orders">
                <Orders> </Orders>
              </PrivateRoute>
              <PrivateRoute exact path="/checkout/:id">
                <CheckOut> </CheckOut>
              </PrivateRoute>
            </Switch>
          </div>
          <Footer>  </Footer>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
