'use client'

import style from "./Leaderboard.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {LangEnum, translate} from "../../../const/lang";
import {FC, useState} from "react";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperClass} from "swiper/types";
import 'swiper/css';

const title = "Leaderboard";

const btns = [
    {
        index: 0,
        label: "$ 10 000",
    },
    {
        index: 1,
        label: "$ 20 000",
    },
    {
        index: 2,
        label: "$ 50 000",
    },
    {
        index: 3,
        label: "$ 100 000",
    },
    {
        index: 4,
        label: "$ 500 000",
    },
    {
        index: 5,
        label: "$ 1000 000",
    },
]

interface ICard {
    index: number
    src: string
    lent: string
    name: string
    attached: string
    earned: string
    profit: string
}

const cards = [
    {
        index: 0,
        src: '/png/leaderboard/src0.png',
        lent: '/png/leaderboard/lent0.png',
        name: "John Smith",
        attached: "$ 123.456.000",
        earned: "15%",
        profit: "$ 23.456.000"
    },
    {
        index: 1,
        src: '/png/leaderboard/src1.png',
        lent: '/png/leaderboard/lent1.png',
        name: "Constantine 123",
        attached: "$ 123.456.000",
        earned: "15%",
        profit: "$ 23.456.000"
    },
    {
        index: 2,
        src: '/png/leaderboard/src2.png',
        lent: '/png/leaderboard/lent2.png',
        name: "Adam Smith",
        attached: "$ 123.456.000",
        earned: "15%",
        profit: "$ 23.456.000"
    },
]

export const Leaderboard = observer(() => {
    const {appStore: {lang}} = useStore();

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)

    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);


    return (
        <div className={style.leaderboard}>

            <div className={style.top}>
                <div className={style.inner}>

                    <h2 className={clsx(style.title, montserrat.className)}>
                        {translate(title, lang)}
                    </h2>

                    <div className={style.btnsMobile}>
                        <div className={style.row}>
                            {
                                [btns[0], btns[1], btns[2]].map(({label, index}, key) => (
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
                        <div className={style.row}>
                            {
                                [btns[3], btns[4], btns[5]].map(({label, index}, key) => (
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
                    </div>

                    <div className={style.btnsDesktop}>
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

                    <div className={style.cardsTabletAndMore}>
                        {
                            cards.map((card, key) => (
                                <Card key={key} {...card} lang={lang}/>
                            ))
                        }
                    </div>

                </div>
            </div>

            <Swiper className={style.cardsMobile}
                    onSwiper={swiper => setSwiper(swiper)}
                    onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
                    slidesPerView='auto'
                    centeredSlides={true}
                    spaceBetween={10}
            >
                {
                    cards.map((card, key) => (
                        <SwiperSlide key={key}
                                     className={style.slide}
                        >
                            <Card key={key} {...card} lang={lang}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className={style.navigator}>
                <div className={style.runner}
                     style={{
                         left: `${currentIndex * 100 / 3}%`
                     }}
                />
            </div>

        </div>
    )
})

//========= CARD =========//
interface ICardComponent extends ICard {
    lang: LangEnum
}

const Card: FC<ICardComponent> = ({
                                      lang,
                                      index,
                                      src,
                                      lent,
                                      name,
                                      attached,
                                      earned,
                                      profit
                                  }) => {
    return (
        <div className={clsx(style.card, style[`card_${index}`])}>

            <img src={src} alt="" className={style.grade}/>

            <div className={style.card_inner}>
                <div className={style.inner_header}>
                    <img src={lent} alt="" className={style.lent}/>
                    <p className={clsx(style.name, montserrat.className)}>
                        {name}
                    </p>


                </div>
                <div className={style.inner_content}>
                    <div className={style.item}>
                        <p className={style.label}>{translate("Attached", lang)}</p>
                        <p className={clsx(style.attached, montserrat.className)}>
                            {attached}
                        </p>
                    </div>
                    <div className={style.item}>
                        <p className={style.label}>{translate("Earned", lang)}</p>
                        <p className={clsx(style.earned, montserrat.className)}>{earned}</p>
                    </div>
                    <div className={style.item}>
                        <p className={style.label}>{translate("Profit", lang)}</p>
                        <p className={clsx(style.profit, montserrat.className)}>{profit}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}