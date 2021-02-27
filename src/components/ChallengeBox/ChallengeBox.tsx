import { useContext } from "react";
import { ChallegensContext } from "../../contexts/ChallengesContext";
import { CountDownContext } from "../../contexts/CountDonwContext";
import styles from "../../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge,completeChallenges } = useContext(ChallegensContext);
  const {resetCountdown} = useContext(CountDownContext);

  function handleChallengeSuceed(){
    completeChallenges();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
    
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} exp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceedButton} onClick={handleChallengeSuceed}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber novos desafios.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
