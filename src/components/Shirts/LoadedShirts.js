import Card from "../UI/Card";
import ShirtItem from "./ShirtItem/ShirtItem";
import styles from "./LoadedShirts.module.css";
import { useEffect, useState } from "react";

const LoadedShirts = () => {
  const [shirts, setShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(
    /*async*/ () => {
      //creating a new function to do the fetch means you can use async, async cannot be used directly on useEffect like above
      const fetchShirts = async () => {
        const response = await fetch(
          "https://capstone-1-334cc-default-rtdb.europe-west1.firebasedatabase.app/shirts.json"
        );
        //if the response is not okay
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        //doing this creates an array from the object we recieve in data
        const loadedShirts = [];
        for (const key in responseData) {
          loadedShirts.push({
            id: key,
            name: responseData[key].name,
            image: responseData[key].image,
            price: responseData[key].price,
          });
        }

        setShirts(loadedShirts);
        setIsLoading(false);
      };
      //another good reason to put the fetch shirts func inside the other func is
      //we can do this catch for errors

      fetchShirts().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    },
    []
  );

  if (isLoading) {
    return (
      <section className={styles.ShirtsLoading}>
        <p> Loading... </p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.ShirtsError}>
        <p> {httpError} </p>
      </section>
    );
  }

  const shirtsList = shirts.map((shirt) => (
    <ShirtItem
      key={shirt.id}
      id={shirt.id}
      name={shirt.name}
      image={shirt.image}
      price={shirt.price}
    />
  ));

  return (
    <section className={styles.shirts}>
      <Card>
        <ul>{shirtsList}</ul>
      </Card>
    </section>
  );
};

export default LoadedShirts;
