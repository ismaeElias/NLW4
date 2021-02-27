import { GetServerSideProps } from "next";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDonwContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level : number;
  currentExperience : number;
  challegesCompleted : number;
}

export default function Home(props : HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challegesCompleted={props.challegesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move it</title>
        </Head>
        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challegesCompleted } = ctx.req.cookies;

  return {
    props: {
      level : Number(level),
      currentExperience:  Number(currentExperience),
      challegesCompleted:  Number(challegesCompleted),
    },
  };
};
