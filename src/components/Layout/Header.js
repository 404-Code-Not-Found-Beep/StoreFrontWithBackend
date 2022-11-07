//this component renders the header for each page
//depending on the page displayed it renders a different image
//depending if the user is logged in or not it will display dynamic content
//it is rendered inside the App component and gets props in the form of
//on show cart or not by dynamically rendering the headercartbutton

import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import HeaderCartButton from "./HeaderCartButton";
import shirtHeaderImg from "../../assets/shirtHeader.png";
import booksHeader from "../../assets/booksHeader.png";
import checkout from "../../assets/checkout.png";
import welcome from "../../assets/welcome.png";

import style from "./Header.module.css";

const CartHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  //getting the end of the url to dynamically show the header image
  let url = "";
  url = window.location.href;
  url = url.slice(-5, -1);

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("username");
  };

  //this variable is to check if its a new user with no items in cart
  let noItemsPlusNewUser = localStorage.getItem("items");

  return (
    <Fragment>
      <header className={style.header}>
        <nav>
          <ul>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? style.active : "")}
                to="/shirts"
              >
                Shirts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? style.active : "")}
                to="/Books"
              >
                Books
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/login"
                >
                  Log in
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink
                  onClick={logoutHandler}
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {noItemsPlusNewUser && <HeaderCartButton onClick={props.onShowCart} />}
      </header>
      {url !== "ofil" && (
        <div className={style["main-image"]}>
          {url === "hirt" && <img src={shirtHeaderImg} alt="Shirt " />}
          {url === "Book" && <img src={booksHeader} alt="Book " />}
          {url === "ckou" && <img src={checkout} alt="Book " />}
          {url === "lcom" && <img src={welcome} alt="Book " />}
        </div>
      )}
    </Fragment>
  );
};

export default CartHeader;
