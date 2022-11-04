//this components renders the ordereditem component and pushes props
//given by the ProfilePastOrders component

import OrderedItem from "./OrderedItem";
const PastOrders = (props) => {
  const ordersList = props.values.map((order) => (
    <OrderedItem
      key={order.id}
      id={order.id}
      name={order.name}
      image={order.image}
      price={order.price}
    />
  ));

  return (
    <li>
      <div>
        <h3>Order Number {props.id}</h3>

        <ul>{ordersList}</ul>
      </div>
    </li>
  );
};

export default PastOrders;
