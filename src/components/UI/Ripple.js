import styles from "./Ripple.module.css";

const Ripple = (props) => {
  <span
    style={{ top: props.top, left: props.left }}
    id="ripple-shape"
    className={styles.rippleShape}
  ></span>;
};

export default Ripple;
