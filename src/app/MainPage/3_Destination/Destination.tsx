'use client'

import style from "./Destination.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {Swiper as SwiperClass} from "swiper/types";
import {cards, ICard} from "./cards";
import {svgIcons} from "../../../assets/svgIcons";
import {Swiper, SwiperSlide} from "swiper/react";

const titles = [
    "Choose Your Destination And",
    "Get Funded",
]

const label1 = "Choose your trading style";
const label2 = "Select account size";
const label3 = "Registration fee";
const buttonLabel = "Get Funded Virtually";

export const Destination = observer(() => {
    const {appStore: {lang}} = useStore();

    const [step, setStep] = useState(1);
    const [size, setSize] = useState("$10K");

    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={style.destination}>

            <div className={style.topWrapper}>
                <div className={style.inner}>

                    <h2 className={style.title}>
                        <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                        <span className={montserrat.className}> {translate(titles[1], lang)}</span>
                    </h2>


                    <div className={style.selectWrapper}>

                        <div className={style.selectWrapperTop}>

                            <p className={clsx(style.label, montserrat.className)}>
                                {label1}
                            </p>

                            <div className={style.selectStep}>
                                {
                                    [1, 2].map((_step, key) => (
                                        <button key={key}
                                                className={clsx({
                                                    [style.btn]: true,
                                                    [style.btn_selected]: _step === step,
                                                })}
                                                onClick={() => setStep(_step)}
                                        >
                                            <span
                                                className={montserrat.className}>{_step}-step</span>
                                        </button>
                                    ))
                                }
                            </div>

                            <p className={clsx(style.label, style.label_2, montserrat.className)}>
                                {label2}
                            </p>

                            <div className={style.selectSize}>
                                {
                                    [
                                        "$10K",
                                        "$25K",
                                        "$50K",
                                        "$100K",
                                        "$200K",
                                        "$300K",
                                    ].map((_size, key) => (
                                        <button key={key}
                                                className={clsx({
                                                    [style.btn]: true,
                                                    [style.btn_selected]: _size === size,
                                                })}
                                                onClick={() => setSize(_size)}
                                        >
                                            <span
                                                className={montserrat.className}>{_size}
                                            </span>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={style.registrationWrapper}>
                            <p className={clsx(style.label, montserrat.className)}>
                                {label3}
                            </p>

                            <div className={style.card}>

                                <p className={clsx(style.value, montserrat.className)}>$70</p>

                                <ButtonCustom label={translate(buttonLabel, lang)}
                                              className={style.btn}
                                              variant={ButtonVariant.blue}
                                />

                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <Swiper className={style.swiper}
                    onSwiper={swiper => setSwiper(swiper)}
                    onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
                    slidesPerView='auto'
                    centeredSlides={true}
                    breakpoints={{
                        [320]: {
                            spaceBetween: 8
                        },
                        [768]: {
                            spaceBetween: 32
                        }
                    }
                    }
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


            <div className={style.cardsDesktop}>
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
                                      lang,
                                      title,
                                      itemsSmall,
                                      itemsBig,
                                      description
                                  }) => {
    return (
        <div className={style.card}>
            <div className={style.titleWrapper}>
                <p className={montserrat.className}>{translate(title, lang)}</p>
                {svgIcons.destination_card_0}
            </div>

            <div className={style.itemsBig}>
                {
                    itemsBig.map(({icon, label, value}, key) => (
                        <div key={key}
                             className={style.itemBig}
                        >
                            <div className={style.left}>
                                {icon}
                                <p>{translate(label, lang)}</p>
                            </div>
                            <p className={clsx(montserrat.className, style.value)}>
                                {translate(value, lang)}
                            </p>
                        </div>
                    ))
                }
            </div>

            <p className={style.description}>
                {translate(description, lang)}
            </p>

            <div className={style.itemsSmall}>
                {
                    itemsSmall.map(({icon, label, value}, key) => (
                        <div key={key}
                             className={style.itemSmall}
                        >
                            <div className={style.left}>
                                {icon}
                                <p>{translate(label, lang)}</p>
                            </div>
                            <p className={clsx(montserrat.className, style.value)}>
                                {translate(value, lang)}
                            </p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}