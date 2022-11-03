import { useReducer } from "react";

import CartContext from "./cart-context";

// items: CartContext.items,
// totalAmount: CartContext.totalAmount,
// };
let totalAmountLocal = JSON.parse(localStorage.getItem("totalAmountLocal"));
let itemsLocal = JSON.parse(localStorage.getItem("items"));
if (itemsLocal === null) {
  itemsLocal = [];
  totalAmountLocal = 0;
}

const defaultCartState = {
  items: itemsLocal,
  totalAmount: totalAmountLocal,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    //set the local storage
    localStorage.setItem("items", JSON.stringify(updatedItems));
    localStorage.setItem(
      "totalAmountLocal",
      JSON.stringify(updatedTotalAmount)
    );
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    //need to remove from local storage as well
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    //set the local storage
    localStorage.setItem("items", JSON.stringify(updatedItems));
    localStorage.setItem(
      "totalAmountLocal",
      JSON.stringify(updatedTotalAmount)
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  localStorage.setItem("totalAmountLocal", 0);
  localStorage.setItem("items", "[]");
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "clear" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
