import style from "./MainPage.module.scss"
import type {Metadata} from "next";
import {Empowering} from "./MainPage/0_Empowering/Empowering";
import {Journey} from "./MainPage/1_Journey/Journey";
import {HowTo} from "./MainPage/2_HowTo/HowTo";
import {Destination} from "./MainPage/3_Destination/Destination";
import {NewEra} from "./MainPage/4_NewEra/NewEra";
import {Discover} from "./MainPage/5_Discover/Discover";
import {Chance} from "./MainPage/6_Chance/Chance";

export const metadata: Metadata = {
    title: "Meta Funding - Main page",
};

const MainPage = () => {
  return (
    <div className={style.mainPage}>
        <Empowering/>
        <Journey/>
        <div className={style.howToWrapper}>
            <HowTo/>
            <img src="/png/main_page/howTo_back.png" alt="" className={style.back}/>
        </div>

        <Destination/>
        <NewEra/>
        <Discover/>
        <Chance/>
    </div>
  )
}

export default MainPage
