//this component renders the ProfilePastOrders component and also the
//change password button
//it updates the user's password via a post fetch request to the firebasedatabase

import styles from "./ProfileForm.module.css";
import { useRef, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import React from "react";
import ProfilePastOrders from "./ProfilePastOrders";

//good use of useRef

const ProfileForm = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [passwordBtnPressed, setPasswordBtnPressed] = useState(false);
  const [pastOrdersBtnPressed, setPastOrdersBtnPressed] = useState(false);

  const changePasswordHandler = () => {
    setPasswordBtnPressed((prevState) => !prevState);
  };

  const showOrdersHandler = () => {
    setPastOrdersBtnPressed((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    //can add validation here

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCnr-1wO8bfm99LaYguLnmacZehovtdJ54",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      //could add the error handling here, but we are just adding the min length on password input instead
      //so we are assuming that this always succeeds
      navigate("/profile");
    });
  };

  return (
    <React.Fragment>
      <div className={styles.action}>
        <button onClick={changePasswordHandler}> Change password</button>
      </div>
      <div className={styles.action}>
        <button onClick={showOrdersHandler}> Show past orders</button>
      </div>
      {passwordBtnPressed && (
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              minLength="6"
              ref={newPasswordInputRef}
            />
          </div>
          <div className={styles.action}>
            <button>Change Password</button>
          </div>
        </form>
      )}

      {pastOrdersBtnPressed && (
        <div>
          <ProfilePastOrders />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileForm;
