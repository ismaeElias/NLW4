import {  createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallegensContext } from "./ChallengesContext";
interface CountDownData {
  minutes : number;
  seconds : number ;
  hasFinished : boolean
  isActive : boolean;
  startCountdown : () => void;
  resetCountdown : () => void;
}

interface CountDownProviderProps {
  children: ReactNode;
}


export const CountDownContext = createContext({} as CountDownData);

let countDownTimeout: NodeJS.Timeout;

export function CountDownProvider({children}: CountDownProviderProps){

  const {startNewChallenge} = useContext(ChallegensContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;


  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setHasFinished(false);

    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountDownContext.Provider>
  )
}