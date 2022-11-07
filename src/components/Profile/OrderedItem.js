//this component renders the user's previous order's items
//it gets its props and is rendered by the past orders component

import styles from "./OrderedItem.module.css";
const OrderedItem = (props) => {
  const totalAmount = props.amount * props.price;
  return (
    <li className={styles.order} onClick={props.onClick}>
      <div>
        <h3>
          {props.name} x {props.amount}
        </h3>
        <div className={styles.description}>
          <img src={props.image} alt="ordered item" width="150" height="150" />
        </div>
        <div className={styles.price}>£{totalAmount}</div>
      </div>
    </li>
  );
};

export default OrderedItem;
