import { Fragment } from "react";

import ShirtsSummary from "./ShirtsSummary";
import AvailableShirts from "./AvailableShirts";

const Shirts = () => {
  return (
    <Fragment>
      <ShirtsSummary />
      <AvailableShirts />
    </Fragment>
  );
};

export default Shirts;
