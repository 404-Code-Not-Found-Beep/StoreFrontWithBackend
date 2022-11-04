import Card from "../UI/Card";
import BookItem from "./BookItem/BookItem";
import styles from "./LoadedBooks.module.css";
import { useEffect, useState } from "react";

const LoadedBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(
    /*async*/ () => {
      //creating a new function to do the fetch means you can use async, async cannot be used directly on useEffect like above
      const fetchBooks = async () => {
        const response = await fetch(
          "https://capstone-1-334cc-default-rtdb.europe-west1.firebasedatabase.app/books.json"
        );
        //if the response is not okay
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        //doing this creates an array from the object we recieve in data
        const loadedBooks = [];
        for (const key in responseData) {
          loadedBooks.push({
            id: key,
            name: responseData[key].name,
            image: responseData[key].image,
            price: responseData[key].price,
          });
        }

        setBooks(loadedBooks);
        setIsLoading(false);
      };
      //another good reason to put the fetch Books func inside the other func is
      //we can do this catch for errors

      fetchBooks().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    },
    []
  );

  if (isLoading) {
    return (
      <section className={styles.BooksLoading}>
        <p> Loading... </p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.BooksError}>
        <p> {httpError} </p>
      </section>
    );
  }

  const booksList = books.map((book) => (
    <BookItem
      key={book.id}
      id={book.id}
      name={book.name}
      image={book.image}
      price={book.price}
    />
  ));

  return (
    <section className={styles.books}>
      <Card>
        <ul>{booksList}</ul>
      </Card>
    </section>
  );
};

export default LoadedBooks;
