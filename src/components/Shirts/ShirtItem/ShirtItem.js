import { useContext } from "react";

import ShirtItemForm from "./ShirtItemForm";
import classes from "./ShirtItem.module.css";
import CartContext from "../../../store/cart-context";

const ShirtItem = (props) => {
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
    <li className={classes.shirt}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>
          <img src={props.image} alt="shirts" width="150" height="150" />
        </div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <ShirtItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ShirtItem;
