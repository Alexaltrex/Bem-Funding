import style from "./MainPage.module.scss"
import type {Metadata} from "next";
import {Empowering} from "./MainPage/0_Empowering/Empowering";
import {Journey} from "./MainPage/1_Journey/Journey";

export const metadata: Metadata = {
    title: "Meta Funding - Main page",
};

const MainPage = () => {
  return (
    <div className={style.mainPage}>
        <Empowering/>
        <Journey/>
    </div>
  )
}

export default MainPage
