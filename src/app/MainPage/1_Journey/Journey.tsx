'use client'
import style from "./Journey.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {LangEnum, translate} from "../../../const/lang";
import {Swiper as SwiperClass} from "swiper/types";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {FC, useState} from "react";
import {cards, ICard} from "./cards";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {ButtonCustom} from "../../../components/_common/ButtonCustom/ButtonCustom";

const titles = [
    "Your Journey To",
    "Trading Excellence",
    "Starts Here",
]

export const Journey = observer(() => {
    const {appStore: {lang}} = useStore();
    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={style.journey}>

            <div className={style.titleWrapper}>
                <div className={style.inner}>
                    <h2 className={style.title}>
                        <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                        <span className={montserrat.className}> {translate(titles[1], lang)} </span>
                        <span className={montserrat.className}>{translate(titles[2], lang)}</span>
                    </h2>
                </div>
            </div>


            <Swiper className={style.swiper}
                    onSwiper={swiper => setSwiper(swiper)}
                    onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
                    slidesPerView='auto'
                    centeredSlides={true}
            >
                {
                    cards.map((card, key) => (
                        <SwiperSlide key={key}
                                     className={style.slide}

                        >
                            <Card lang={lang} {...card}/>
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

            <div className={style.cards}>
                <div className={style.inner}>
                    {
                        cards.map((card, key) => (
                            <Card key={key} lang={lang} {...card}/>
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
}

const Card: FC<ICardComponent> = ({
                                      icon,
                                      text,
                                      button,
                                      lang
                                  }) => {
    const {label, ...rest} = button;
    return (
        <div className={style.card}>
            <img src={icon} alt=""/>
            <div className={clsx(style.text, montserrat.className)}>
                <p>{translate(text[0], lang)}</p>
                <p>{translate(text[1], lang)}</p>
            </div>
            <ButtonCustom {...rest}
                          label={translate(label, lang)}
                          className={style.btn}
            />
        </div>
    )
}