import FancyButton from "../UI/FancyButton";
import Card from "../UI/Card";
import shirtHeaderImg from "../../assets/test.png";
import booksHeader from "../../assets/booksHeader.png";
import styles from "./WelcomeFunctional.module.css";

import { useNavigate } from "react-router-dom";

const WelcomeFunctional = () => {
  const navigate = useNavigate();

  const navHandlerShirts = () => {
    navigate("/shirts");
  };

  const navHandlerBooks = () => {
    navigate("/books");
  };

  return (
    <section>
      <FancyButton />

      <div className={styles.card} onClick={navHandlerShirts}>
        <div>
          <h2> Shirts</h2>
        </div>
        <div>
          <img src={shirtHeaderImg} alt="Shirt " height="100px" width="300px" />
        </div>
      </div>
      <div className={styles.card} onClick={navHandlerBooks}>
        <div>
          <h2> Books</h2>
        </div>
        <div>
          <img src={booksHeader} alt="Book " height="100px" width="300px" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeFunctional;