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
