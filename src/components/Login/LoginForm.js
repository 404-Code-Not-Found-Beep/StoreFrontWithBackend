import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./LoginForm.module.css";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
    setIsLoading(true);
    let url;
    if (isLogin) {
      //if the user is logged in already theyll use this url
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgRHlUchXGRr-INpUrbAV_ID9eIo1ery4";
    } else {
      //if the user is not logged in it means theyre making a new account so will use this url
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
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Something went wrong";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate("/");
      })
      .catch((err) => {
        //we will end up here if we have a non successful request
        alert(err.message);
      });
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            data-cy="enterEmail"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            data-cy="enterPassword"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={styles.actions}>
          {!isLoading && (
            <button data-cy="submitSignup">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request</p>}
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
