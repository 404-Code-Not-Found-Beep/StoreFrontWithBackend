//this component renders the user's past orders
//using localstorage to get the username and fetching from the firebasedatabase
//

import { useEffect, useState } from "react";

import styles from "./ProfilePastOrders.module.css";
import Card from "../UI/Card";
import PastOrders from "./PastOrders";

let userName = "";
let localUserName = localStorage.getItem("username");
if (localUserName) {
  userName = localUserName.replace(".", "");
}

const ProfilePastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [noOrders, setNoOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        `https://capstone-1-334cc-default-rtdb.europe-west1.firebasedatabase.app/orders/${userName}.json`
      );
      //if response is not okay
      if (!response.ok) {
        throw new Error("something went wrong, have you ordered here before?");
      }

      const responseData = await response.json();

      //create array from response object
      let loadedOrders = [];
      for (let i in responseData) {
        //for each order put them into a separate array
        let orderArr = [];
        loadedOrders.push({ id: i, values: orderArr });
        for (let j in responseData[i].orderedItems) {
          orderArr.push({
            id: i + responseData[i].orderedItems[j].name,
            name: responseData[i].orderedItems[j].name,
            image: responseData[i].orderedItems[j].image,
            price: responseData[i].orderedItems[j].price,
            orderNumber: i,
          });
        }
      }
      if (!responseData) {
        setNoOrders(true);
      }
      if (responseData) {
        setNoOrders(false);
      }
      setOrders(loadedOrders);
      setIsLoading(false);
    };
    fetchOrders().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.OrdersLoading}>
        <p> Loading... </p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={styles.OrdersError}>
        <p> {httpError} </p>
      </section>
    );
  }

  const pastOrder = orders.map((order) => (
    <PastOrders key={order.id} id={order.id} {...order}></PastOrders>
  ));

  return (
    <section className={styles.shirts}>
      {!noOrders && (
        <Card>
          <ul>{pastOrder}</ul>
        </Card>
      )}
      {noOrders && (
        <Card>
          <p>no previous orders found</p>
        </Card>
      )}
    </section>
  );
};

export default ProfilePastOrders;
