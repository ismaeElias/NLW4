import { useContext } from 'react';
import { ChallegensContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/CompleteChallenges.module.css';


export function CompleteChallenges(){
  const { challegesCompleted } = useContext(ChallegensContext);
  return(
    <div className={styles.CompleteChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challegesCompleted}</span>
    </div>
  );
}