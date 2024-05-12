import style from "./MainPage.module.scss"
import type {Metadata} from "next";
import {BeyondThePeak} from "./MainPage/0_BeyondThePeak/BeyondThePeak";
import {EvaluationProcess} from "./MainPage/2_EvaluationProcess/EvaluationProcess";
import {ChooseYourTradingStyle} from "./MainPage/3_ChooseYourTradingStyle/ChooseYourTradingStyle";
import {CollaborativeExellence} from "./MainPage/6_CollaborativeExellence/CollaborativeExellence";
import {MeetWith} from "./MainPage/4_MeetWith/MeetWith";
import {ChooseBem} from "./MainPage/5_ChooseBem/ChooseBem";

export const metadata: Metadata = {
    title: "Meta Funding - Main page",
};

const MainPage = () => {
  return (
    <div className={style.mainPage}>
        <BeyondThePeak/>
        <div className={style.howToWrapper}>
            <EvaluationProcess/>
            <img src="/png/main_page/howTo_back.png" alt="" className={style.back}/>
        </div>

        <ChooseYourTradingStyle/>
        <MeetWith/>
        <ChooseBem/>

        <CollaborativeExellence/>

        <img src="/png/main_page/mounts_bottom.png" alt="" className={style.mounts_bottom}/>

    </div>
  )
}

export default MainPage
