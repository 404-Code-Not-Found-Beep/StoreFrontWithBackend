import { MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import Ripple from "./Ripple";
import styles from "./FancyButton.module.css";

const FancyButton = () => {
  //   const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
  //     if (!document.getElementById("ripple-shape")) {
  //       const btn: HTMLButtonElement = e?.currentTarget;
  //       const rect: DOMRect = btn.getBoundingClientRect();
  //       const top = `${e.clientY - rect.y}px`;
  //       const left = `${e.clientX - rect.x}px`;
  //       const container = createRoot(document.getElementById("ripple-container"));
  //       container.render(<Ripple top={top} left={left} />);
  //       setTimeout(() => container.unmount(), 1000);
  //     }
  //   };
  //   return (
  //     <button onClick={clickHandler} className={styles.rippleButton}>
  //       <span className={styles.rippleButtonText}>
  //         click here<span className={styles.symbolsOutlined}>arrow_forward</span>
  //       </span>
  //       <span id="ripple-container"></span>
  //     </button>
  //   );
  // return (
  //   <CCard style={{ width: "18rem" }}>
  //     <CCardImage orientation="top" src="/images/react.jpg" />
  //     <CCardBody>
  //       <CCardText>
  //         Some quick example text to build on the card title and make up the
  //         bulk of the card's content.
  //       </CCardText>
  //     </CCardBody>
  //   </CCard>
  // );
};

export default FancyButton;
