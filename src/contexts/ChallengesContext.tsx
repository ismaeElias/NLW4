import { createContext, useState, ReactNode } from "react";
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
  activeChallenge : Challenge;
}

export const ChallegensContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengerProviderProps) {
  const [level, setLevelUp] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challegesCompleted, setChallegesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2);

  function levelUp() {
    setLevelUp(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
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
        experienceToNextLevel
      }}
    >
      {children}
    </ChallegensContext.Provider>
  );
}
