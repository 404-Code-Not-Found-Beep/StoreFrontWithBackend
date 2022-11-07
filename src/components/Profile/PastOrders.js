//this components renders the ordereditem component and pushes props
//given by the ProfilePastOrders component

import styles from "./PastOrders.module.css";
import OrderedItem from "./OrderedItem";
import { useState } from "react";
import Card from "../UI/Card";

const PastOrders = (props) => {
  const [orderPressed, setOrderPressed] = useState(false);

  const orderPressedHander = () => {
    setOrderPressed((prevState) => !prevState);
  };

  const ordersList = props.values.map((order) => (
    <OrderedItem
      key={order.id}
      id={order.id}
      name={order.name}
      image={order.image}
      price={`£ ${order.price}`}
      onClick={orderPressedHander}
    />
  ));

  return (
    <Card>
      <div onClick={orderPressedHander}>
        <h3>Order Number {props.id}</h3>
        {orderPressed && <ul className={styles.ul}>{ordersList}</ul>}
      </div>
    </Card>
  );
};

export default PastOrders;
