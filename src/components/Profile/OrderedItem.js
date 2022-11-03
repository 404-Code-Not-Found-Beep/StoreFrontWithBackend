import styles from "./OrderedItem.module.css";
const OrderedItem = (props) => {
  return (
    <li className={styles.order}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>
          <img src={props.image} alt="ordered item" width="150" height="150" />
        </div>
        <div className={styles.price}>{props.price}</div>
      </div>
    </li>
  );
};

export default OrderedItem;
