import ChefAndFood from "../components/home/ChefAndFood";
import EaseOfUse from "../components/home/EaseOfUse";
import Location from "../components/home/Location";
import Membership from "../components/home/Membership";
import Reviews from "../components/home/Reviews";
import TopSection from "../components/home/TopSection";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <div className={styles.home}>
        <TopSection />
        {/* <Location /> */}
        <EaseOfUse />
        <ChefAndFood />
        <Reviews />
        <Membership />
      </div>
    </>
  );
}

export default Home;
