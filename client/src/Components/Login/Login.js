import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.site || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };

        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            sessionStorage.setItem("token", idToken);
            setUser(signInUser);
            setLoggedInUser(signInUser);
            history.replace(from);
            // console.log(idToken)
          })
          .catch(function (error) {});

        console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
    console.log("Sign in clicked");
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(signedOutUser);

        console.log(res);
      })
      .catch((err) => {});
    console.log("Sign out clicked");
  };

  return (
    <div>
      <div className="text-center">
        {user.isSignedIn ? (
          <h1> Welcome to shop-24 ! {user.name} </h1>
        ) : (
          <h1> if you login, You logged in! </h1>
        )}
      </div>
      <div
        className="text-center m-4"
        style={{
          boxShadow: "10px 10px 20px lightgray",
          padding: "30px",
          color: "gray",
          backgroundColor: "rgb(240, 236, 241)",
        }}
      >
        {user.isSignedIn ? (
          <h3> Sign out may lose your Shop-24 access </h3>
        ) : (
          <h3>Please sign in with your google account to continue!</h3>
        )}{" "}
        <br />
        {user.isSignedIn ? (
          <button
            className="btn btn-danger mx-auto w-50 m-4 p-2 "
            onClick={handleSignOut}
          >
            <img style={{ width: "30px" }} src="" alt="" /> Sign Out{" "}
          </button>
        ) : (
          <button
            className="btn btn-outline-primary mx-auto w-50 m-4 p-2 "
            onClick={handleSignIn}
          >
            <img
              style={{ width: "30px" }}
              src="https://raw.githubusercontent.com/ProgrammingHero1/travel-guru/master/Icon/google.png"
              alt=""
            />{" "}
            Google Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
