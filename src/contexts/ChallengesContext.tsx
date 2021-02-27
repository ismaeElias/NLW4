import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../challenges.json';


interface ChallengerProviderProps {
  children: ReactNode;
}

interface Challenge {
  type : 'body' | 'eye';
  description: string;
  amount : number;

}
interface ChallengesContextData {
  level: number;
  currentExperience : number;
  challegesCompleted : number;
  experienceToNextLevel : number;
  startNewChallenge : () => void;
  levelUp : () => void;
  resetChallenge : () => void;
  completeChallenges: () => void;
  activeChallenge : Challenge;
}

export const ChallegensContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengerProviderProps) {
  const [level, setLevelUp] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challegesCompleted, setChallegesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2);

  useEffect(() => {
    Notification.requestPermission();
  },[])

  function levelUp() {
    setLevelUp(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification(`Novo desafio \u{1F642}` , {
        body: `Valendo ${challenge.amount} exp`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenges(){
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallegesCompleted(challegesCompleted + 1);
  }


  return (
    <ChallegensContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challegesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenges
      }}
    >
      {children}
    </ChallegensContext.Provider>
  );
}
