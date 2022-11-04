//this component could also be named "shirts page" as it
//renders the "shirts summary" and "loadedshirts"
import { Fragment } from "react";

import ShirtsSummary from "./ShirtsSummary";
import LoadedShirts from "./LoadedShirts";

const Shirts = () => {
  return (
    <Fragment>
      <ShirtsSummary />
      <LoadedShirts />
    </Fragment>
  );
};

export default Shirts;
