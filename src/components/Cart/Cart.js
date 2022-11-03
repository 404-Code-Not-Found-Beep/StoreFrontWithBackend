import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

import AuthContext from "../../store/auth-context";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  let totalAmountLocal = JSON.parse(localStorage.getItem("totalAmountLocal"));
  //set local storage to 0, otherwise nothing works
  if (totalAmountLocal === null) {
    totalAmountLocal = 0;
  }
  //change this so we still use cartCtx.totalAmount but change cartCtx to the local storage
  const totalAmountExTax = `£${totalAmountLocal.toFixed(2)}`;
  const tax = `£${(totalAmountLocal * 0.1).toFixed(2)}`;
  const totalAmountIncTax = `£${(totalAmountLocal * 1.1).toFixed(2)}`;

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://capstone-1-334cc-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  let products = JSON.parse(localStorage.getItem("items"));

  const cartItems = (
    <ul className={classes["cart-items"]}>
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
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && authCtx.isLoggedIn && (
        <Link to="/checkout">
          <button className={classes.button} onClick={props.onClose}>
            Order as logged in user
          </button>
        </Link>
      )}
      {hasItems && !authCtx.isLoggedIn && (
        <Link to="/checkout">
          <button className={classes.button} onClick={props.onClose}>
            Order without logging in
          </button>
        </Link>
      )}
      {hasItems && !authCtx.isLoggedIn && (
        <Link to="/auth">
          <button className={classes.button} onClick={props.onClose}>
            login
          </button>
        </Link>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total ex Tax</span>
        <span>{totalAmountExTax}</span>
      </div>
      <span>Tax (10%) </span>
      <span>{tax}</span>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountIncTax}</span>
      </div>
      <span className={classes.actions}>
        <button className={classes.button} onClick={cartItemsRemoverHandler}>
          Empty Cart
        </button>
      </span>

      {modalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
    </Modal>
  );
};

export default Cart;
