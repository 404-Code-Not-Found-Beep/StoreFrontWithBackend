import { useContext } from "react";

import ShirtItemForm from "./ShirtItemForm";
import styles from "./ShirtItem.module.css";
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
    <li className={styles.shirt}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>
          <img src={props.image} alt="shirts" width="150" height="150" />
        </div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <ShirtItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ShirtItem;
