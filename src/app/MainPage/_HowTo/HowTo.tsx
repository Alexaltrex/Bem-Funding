'use client'

import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import style from "./HowTo.module.scss"
import {LangEnum, translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";
import {cards, ICard} from "./cards";
import {FC, useState} from "react";
import {clsx} from "clsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperClass} from "swiper/types";
import 'swiper/css';

const pre = 'EVALUATION PROCESS'

const titles = [
    "How To Become A",
    "Funded Star",
]

export const HowTo = observer(() => {
    const {appStore: {lang}} = useStore();
    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={style.howTo}>

            <p className={style.pre}>
                {translate(pre, lang)}
            </p>

            <div className={style.titleWrapper}>
                <div className={style.inner}>
                    <h2 className={style.title}>
                        <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                        <span className={montserrat.className}> {translate(titles[1], lang)}</span>

                    </h2>
                </div>
            </div>

            <Swiper className={style.swiper}
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
                            <Card lang={lang} {...card} index={key}/>
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


            <div className={style.cardsWrapper}>
                <div className={style.inner}>

                    <div className={style.row}>
                        <Card {...cards[0]} lang={lang} index={0}/>
                        <Card {...cards[1]} lang={lang} index={1}/>
                    </div>

                    <Card {...cards[2]} lang={lang} index={2}/>

                </div>
            </div>


        </div>
    )
})

//========= CARD =========//
interface ICardComponent extends ICard {
    lang: LangEnum
    className?: string
    index: number
}

const Card: FC<ICardComponent> = ({
                                      lang, phase,
                                      pre,
                                      title,
                                      description,
                                      src,
                                      figure,
                                      className,
                                      index,
                                      extra

                                  }) => {
    return (
        <div className={clsx(style.card, style[`card_${index}`])}
        >

            <img src={src} alt="" className={style.back}/>
            <img src={figure} alt="" className={style.figure}/>
            {extra && <img src={extra} alt="" className={style.extra}/>}

            <div className={style.content}>
                <p className={style.phase}>
                    {translate(phase, lang)}
                </p>

                <p className={style.cardPre}>
                    {translate(pre, lang)}
                </p>

                <p className={clsx(style.cardTitle, montserrat.className)}>
                    {translate(title, lang)}
                </p>

                <p className={clsx(style.description)}>
                    {translate(description, lang)}
                </p>
            </div>


        </div>
    )
}