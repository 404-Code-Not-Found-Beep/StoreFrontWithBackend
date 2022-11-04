//this component renders the header style information for the books page

import styles from "./BooksSummary.module.css";

const BooksSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>WYWM Books</h2>
      <p>At WYWM we love books too, check out some of our books.</p>
      <p>unlock your potential</p>
    </section>
  );
};

export default BooksSummary;
