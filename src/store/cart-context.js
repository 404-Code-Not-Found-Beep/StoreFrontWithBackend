//this component creates a context for the cart
//local storage is used to set the values incase they havent been set already

import React from "react";

let totalAmountLocal = JSON.parse(localStorage.getItem("totalAmountLocal"));
let itemsLocal = JSON.parse(localStorage.getItem("items"));
if (itemsLocal === null) {
  totalAmountLocal = 0;
  itemsLocal = [];
}

let tmp = 0;
let tmpItems = [];
if (totalAmountLocal) {
  tmp = totalAmountLocal;
  tmpItems = itemsLocal;
}

const CartContext = React.createContext({
  items: tmpItems,
  totalAmount: tmp,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
