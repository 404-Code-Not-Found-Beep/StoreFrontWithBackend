//this component renders the cart as a modal popup
//it uses cartCtx to add and remove items
//and uses local storage to get the items to display
//it renders the "cartitem" component pushing the props from localstorage into it
//authCtx is uses to check if the user is logged in or not

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";

import AuthContext from "../../store/auth-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  let totalAmountLocal = JSON.parse(localStorage.getItem("totalAmountLocal"));
  //set local storage to 0, otherwise nothing works
  if (totalAmountLocal === null) {
    totalAmountLocal = 0;
  }
  const totalAmountExTax = `£${totalAmountLocal.toFixed(2)}`;
  const tax = `£${(totalAmountLocal * 0.1).toFixed(2)}`;
  const totalAmountIncTax = `£${(totalAmountLocal * 1.1 + 20).toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemsRemoverHandler = () => {
    cartCtx.clearCart();
  };

  let products = JSON.parse(localStorage.getItem("items"));

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {products.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && authCtx.isLoggedIn && (
        <Link to="/checkout">
          <button className={styles.button} onClick={props.onClose}>
            Order as logged in user
          </button>
        </Link>
      )}
      {hasItems && !authCtx.isLoggedIn && (
        <Link to="/checkout">
          <button className={styles.button} onClick={props.onClose}>
            Order without logging in
          </button>
        </Link>
      )}
      {hasItems && !authCtx.isLoggedIn && (
        <Link to="/Login">
          <button className={styles.button} onClick={props.onClose}>
            login
          </button>
        </Link>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total ex Tax</span>
        <span>{totalAmountExTax}</span>
      </div>
      <span>Tax (10%) </span>
      <span>{tax}</span>
      <div className={styles.total}>
        <span>Total Amount (plus shipping)</span>
        <span>{totalAmountIncTax}</span>
      </div>
      <span className={styles.actions}>
        <button className={styles.button} onClick={cartItemsRemoverHandler}>
          Empty Cart
        </button>
      </span>

      {modalActions}
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>{cartModalContent}</Modal>;
};

export default Cart;
