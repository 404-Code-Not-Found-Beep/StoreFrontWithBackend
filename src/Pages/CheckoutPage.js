//this component renders the checkout page, it uses the cartItem and CheckoutFunctionalBootstrap
//component and pushes props to them both
//this component posts to the firebasedatabase and also
//is the functional code that recieves the user data and items ordered to email
//the user using rapid api sendgrid

import React, { useContext, useState } from "react";
import CartItem from "../components/Cart/CartItem";
import styles from "../components/Cart/Cart.module.css";
import CartContext from "../store/cart-context";
import CheckoutFunctionalBootstrap from "../components/Checkout/CheckoutFunctionalBootstrap";

const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  let products = JSON.parse(localStorage.getItem("items"));
  let userName = localStorage.getItem("username");
  if (!userName) {
    userName = "not logged in";
  }
  userName = userName.replace(".", "");
  let url = `https://capstone-1-334cc-default-rtdb.europe-west1.firebasedatabase.app/orders/${userName}.json`;

  let totalAmountLocal = JSON.parse(localStorage.getItem("totalAmountLocal"));
  //set local storage to 0, otherwise nothing works
  if (totalAmountLocal === null) {
    totalAmountLocal = 0;
  }
  const totalAmountExTax = `£${totalAmountLocal.toFixed(2)}`;
  const tax = `£${(totalAmountLocal * 0.1).toFixed(2)}`;
  const totalAmountIncTax = `£${(totalAmountLocal * 1.1 + 20).toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  //let userInfo = [];
  //  let items = [];
  const sendEmailHandler = (userInfo, items) => {
    //using the user data object and the items array
    let hashedCard = userInfo.ccNumber;
    hashedCard = hashedCard.slice(-4);
    hashedCard = "**** **** **** " + hashedCard;
    let productReceipt = "";
    for (let i in items) {
      productReceipt += "" + items[i].name + ", ";
    }

    let emailContent =
      '{"personalizations":[{"to":[{"email":"' +
      userInfo.emailAddress +
      '"}],"subject":"receipt"}],"from":{"email":"from_address@example.com"},"content":[{"type":"text/plain","value":"' +
      productReceipt +
      " " +
      userInfo.name +
      " " +
      userInfo.city +
      " " +
      userInfo.street +
      " " +
      userInfo.postalCode +
      " " +
      userInfo.ccName +
      " " +
      hashedCard +
      " " +
      userInfo.ccExpiration +
      " " +
      userInfo.ccCVV +
      '"}]};';

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d2a6b22e70msh112afc6765ac685p1fb8b7jsnd2f193e38328",
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      body: emailContent,
    };

    fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", options);
    //.then((response) => response.json())
    //.then((response) => console.log(response))
    //.catch((err) => console.error(err));
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
    sendEmailHandler(userData, cartCtx.items);
  };

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

  const isSubmittingContent = (
    <h1 className="text-center pb-3 ml-3">Sending order</h1>
  );
  const successMessage = (
    <h1 className="text-center pb-3 ml-3">Successfully sent</h1>
  );
  const checkoutBody = (
    <div className=" px-5">
      {userName !== "not logged in" && (
        <h1 className="text-center pb-3 ml-3">
          Hello {userName}, your current cart:
        </h1>
      )}
      <div className="row g-5 p-3 ml-3">
        <div className="col-md-5 col-lg-4 order-md-last">
          {cartItems}
          <div className={styles.total}>
            <span>Total ex Tax</span>
            <span>{totalAmountExTax}</span>
          </div>
          <span>Tax (10%) </span>
          <span>{tax}</span>
          <div>Shipping £20</div>

          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmountIncTax}</span>
          </div>
        </div>
        <div className="col-md-7 col-lg-8">
          <CheckoutFunctionalBootstrap onConfirm={submitOrderHandler} />
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className=" px-5">
        {!isSubmitting && didSubmit && successMessage}
        {isSubmitting && isSubmittingContent}
        {!isSubmitting && !didSubmit && checkoutBody}
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;
