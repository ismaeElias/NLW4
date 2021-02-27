import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal/LevelUpModal";

interface ChallengerProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challegesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challegesCompleted: number;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenges: () => void;
  closeLevelUpModal: () => void;
  activeChallenge: Challenge;
}

export const ChallegensContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengerProviderProps) {
  const [level, setLevelUp] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challegesCompleted, setChallegesCompleted] = useState(rest.challegesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModal, setIsLevelUpModal] = useState(false);


  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challegesCompleted", String(challegesCompleted));
  }, [level, currentExperience, challegesCompleted]);

  function levelUp() {
    setLevelUp(level + 1);
    setIsLevelUpModal(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModal(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification(`Novo desafio \u{1F642}`, {
        body: `Valendo ${challenge.amount} exp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenges() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
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
        completeChallenges,
        closeLevelUpModal
      }}
    >
      {children}

      {isLevelUpModal && <LevelUpModal />}
    </ChallegensContext.Provider>
  );
}
