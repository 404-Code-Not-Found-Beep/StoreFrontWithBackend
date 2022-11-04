//this component renders the ProfileForm component

import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={styles.profile}>
      <div className="mx-5 px-5"> " "</div>
      <h1 className="mx-5">Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
