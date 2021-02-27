import { useContext } from "react";
import { ChallegensContext } from "../../contexts/ChallengesContext";
import styles from "../../styles/components/Profile.module.css";

export function Profile() {

  const { level } = useContext(ChallegensContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/ismaeElias.png" alt="Ismael Elias" />
      <div>
        <strong>Ismael Elias</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
