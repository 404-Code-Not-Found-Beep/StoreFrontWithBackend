//this component renders whatever is given to it via props
//it is a small user interface component to be used multiple times

import styles from "./Card.module.css";

const Card = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
