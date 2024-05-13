'use client'

import style from "./Leaderboard.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {useState} from "react";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import 'swiper/css';
import {btns} from "./data";
import {cardsNew} from "./data";
import {svgIcons} from "../../../assets/svgIcons";
import {CloudComponent} from "../../../components/_common/Cloud/Cloud";

const title = "Leaderboard";


export const Leaderboard = observer(() => {
    const {appStore: {lang}} = useStore();

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)

    return (
        <div className={style.leaderboard}>

            <img src="/png/leaderboard/mounts.png" alt="" className={style.mounts}/>
            <img src="/png/leaderboard/figure.png" alt="" className={style.figure}/>
            <img src="/png/header_blur.png" alt="" className={style.header_blur}/>
            <div className={style.cloudWrapper}>
                <CloudComponent seed={1}/>
            </div>


            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.btns}>
                    {
                        btns.map(({label, index}, key) => (
                            <button key={key}
                                    className={clsx({
                                        [style.btn]: true,
                                        [style.btn_selected]: index === selectedButtonIndex,
                                    })}
                                    onClick={() => setSelectedButtonIndex(index)}
                            >
                                <span>{label}</span>
                            </button>
                        ))
                    }
                </div>


                <div className={style.cardsWrapper}>
                    {
                        cardsNew.map(({
                                          order,
                                          avatarSrc,
                                          lent,
                                          name,
                                          country,
                                          challengeValue,
                                          earned,
                                          endDate,
                                          behindBrightestStar,
                                      }, key) => (
                            <div key={key}
                                 className={style.card}
                            >

                                <img src={lent} alt="" className={style.lent}/>
                                <p className={clsx(style.order, montserrat.className)}>
                                    {order}
                                </p>

                                <div className={style.cardTop}>
                                    <img src={avatarSrc} alt=""/>
                                    <div className={style.cardTopLeft}>
                                        <p className={clsx(style.name, montserrat.className)}>
                                            {name}
                                        </p>
                                        <div className={style.countryWrapper}>
                                            {svgIcons.flag_eng}
                                            <p className={style.country}>
                                                {country}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.cardPrize}>
                                    {/*@ts-ignore*/}
                                    {svgIcons[`trophy_${key}`]}
                                    <p className={style.prizeLabel}>{translate("Prize", lang)}</p>

                                    <p className={clsx(montserrat.className, style.account)}>
                                        {challengeValue} {translate("Challenge Account", lang)}
                                    </p>

                                </div>

                                <div className={style.cardEarned}>
                                    <p className={style.earnedLabel}>{translate("Earned", lang)}</p>
                                    <p className={clsx(style.earned, montserrat.className)}>{earned}</p>
                                </div>

                                <div className={style.cardBottom}>
                                    <div>
                                        <p>{translate("End Date", lang)}</p>
                                        <p className={montserrat.className}>{endDate}</p>
                                    </div>
                                    <div>
                                        <p>{translate("Behind Brightest Star", lang)}</p>
                                        <p className={montserrat.className}>{behindBrightestStar}</p>
                                    </div>
                                </div>


                            </div>
                        ))
                    }

                </div>


            </div>


        </div>
    )
})

