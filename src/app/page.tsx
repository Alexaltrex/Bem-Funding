import style from "./MainPage.module.scss"
import type {Metadata} from "next";
import {Empowering} from "./MainPage/0_Empowering/Empowering";
import {Journey} from "./MainPage/1_Journey/Journey";
import {HowTo} from "./MainPage/2_HowTo/HowTo";
import {Destination} from "./MainPage/3_Destination/Destination";
import {NewEra} from "./MainPage/4_NewEra/NewEra";
import {Discover} from "./MainPage/5_Discover/Discover";

export const metadata: Metadata = {
    title: "Meta Funding - Main page",
};

const MainPage = () => {
  return (
    <div className={style.mainPage}>
        <Empowering/>
        <Journey/>
        <HowTo/>
        <Destination/>
        <NewEra/>
        <Discover/>
    </div>
  )
}

export default MainPage
