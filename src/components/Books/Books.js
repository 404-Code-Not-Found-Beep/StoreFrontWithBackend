//this component could also be named "books page" as it
//renders the "books summary" and "loadedBooks"

import { Fragment } from "react";

import BooksSummary from "./BooksSummary";
import LoadedBooks from "./LoadedBooks";

const Books = () => {
  return (
    <Fragment>
      <BooksSummary />
      <LoadedBooks />
    </Fragment>
  );
};

export default Books;
