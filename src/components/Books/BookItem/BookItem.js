import { useContext } from "react";

import BookItemForm from "./BookItemForm";
import classes from "./BookItem.module.css";
import CartContext from "../../../store/cart-context";

const BookItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `£${props.price}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
  };

  return (
    <li className={classes.book}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>
          <img src={props.image} alt="book item" width="150" height="150" />
        </div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <BookItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default BookItem;
