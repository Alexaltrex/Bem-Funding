'use client'

import style from "./Leaderboard.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {LangEnum, translate} from "../../../const/lang";
import {FC, useState} from "react";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import 'swiper/css';
import {btns, cards, ICard} from "./data";
import {CloudComponent} from "../../../components/_common/Cloud/Cloud";
import {Swiper as SwiperClass} from "swiper/types";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {svgIcons} from "../../../assets/svgIcons";

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

                <Swiper slidesPerView='auto'
                        centeredSlides={true}
                        className={style.cardsMobile}
                        spaceBetween={8}
                        initialSlide={1}

                >
                    {
                        cards.map((card, key) => (
                            <SwiperSlide key={key}
                                         className={style.slide}
                            >
                                <Card key={key} index={key} lang={lang} {...card}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <div className={style.cardsTabletAndMore}>
                    {
                        cards.map((card, key) => (
                            <Card key={key} index={key} {...card}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})

//========= CARD =========//
interface ICardComponent extends ICard {
    lang: LangEnum
    index: number
}

const Card: FC<ICardComponent> = ({
                                      lang,
                                      index,
                                      name,
                                      lent,
                                      order,
                                      attached,
                                      earned,
                                      profit,
                                  }) => {
    return (
        <div className={clsx(style.card, style[`card_${index}`])}>
            <div className={style.innerCard}>

                <div className={style.cardHeader}>

                    <img src={lent} alt="" className={style.lent}/>

                    <p className={clsx(montserrat.className, style.order)}>{order}</p>

                    <p className={clsx(montserrat.className, style.name)}>
                        {name}
                    </p>

                    {svgIcons.flag_eng}
                </div>

                <div className={style.cardBody}>

                    <p className={style.label}>
                        {translate("Attached", lang)}
                    </p>

                    <p className={clsx(montserrat.className, style.attached)}>
                        {attached}
                    </p>

                    <div className={style.dividerTop}/>

                    <p className={style.label}>
                        {translate("Earned", lang)}
                    </p>

                    <p className={clsx(montserrat.className, style.earned)}>
                        {earned}
                    </p>

                    <div className={style.dividerTop}/>

                    <p className={style.label}>
                        {translate("Profit", lang)}
                    </p>

                    <p className={clsx(montserrat.className, style.profit)}>
                        {profit}
                    </p>
                </div>

            </div>
        </div>
    )
}



