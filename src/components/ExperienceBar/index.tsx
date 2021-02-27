import { useContext } from 'react';
import { ChallegensContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/ExperienceBar.module.css';
export function ExperienceBar(){

  const { currentExperience, experienceToNextLevel } = useContext(ChallegensContext);
  const percentToNextLevel = Math.round(currentExperience * 100)/experienceToNextLevel;

  return(
    <header className={styles.experienceBar}>
      <span>0 exp</span>
      <div>
        <div style={{width : `${percentToNextLevel}%`, transition : `width 0.3s ease-in-out`}}/>
        <span className={styles.currentExperience} style={{left : `${percentToNextLevel}%` ,  transition : `left 0.3s ease-in-out`}}>{currentExperience} exp</span>
      </div>
      <span>{experienceToNextLevel} exp</span>
    </header>
  );
}