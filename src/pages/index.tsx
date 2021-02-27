import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDonwContext";
export default function Home() {
  return (
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
  );
}
