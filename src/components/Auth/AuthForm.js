import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //add validation here

    setIsLoading(true);

    //this if else is done by getting the url if logged in or not and attach
    // the url to the same fetch function as the code is the same
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgRHlUchXGRr-INpUrbAV_ID9eIo1ery4";
    } else {
      //can create your own custom hook, redux etc but we are going to use fetch
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgRHlUchXGRr-INpUrbAV_ID9eIo1ery4";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          localStorage.setItem("username", enteredEmail);
          // return the response json with no promise (the .then in the else)
          return response.json();
        } else {
          //error
          return response.json().then((data) => {
            let errorMessage = "Something went wrong";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            //forwards the error message to the catch block at the end by
            // throwing the error, causing this promis and the outer promise to be rejected
            throw new Error(errorMessage);
            //can parse into the .message and match it and show custom errors
          });
        }
      })
      .then((data) => {
        //we will end up here if we have a successful request
        //so we know that direbase will have returned a token
        console.log(data);
        //calling the login function in auth-Context
        //login function wants the token so inside data from firebase theres a
        //field called idToken

        //the time given back from firebase (expiresIn) is in seconds not milliseconds
        //+data.expires is to convert the string to a int
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        //expirationTime needs to be handed too for profile form
        authCtx.login(data.idToken, expirationTime.toISOString());
        //redirect
        navigate("/");
      })
      .catch((err) => {
        //we will end up here if we have a non successful request
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            data-cy="enterEmail"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            data-cy="enterPassword"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button data-cy="submitSignup">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
