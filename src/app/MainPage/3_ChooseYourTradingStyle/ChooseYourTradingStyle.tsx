'use client'

import style from "./ChooseYourTradingStyle.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {Swiper as SwiperClass} from "swiper/types";
import {Swiper, SwiperSlide} from "swiper/react";
import Slider from '@mui/material/Slider';
import {cardsNew, ICardNew} from "./cardsNew";

const titles = [
    "Choose your trading style and",
    "get started",
]

const panelTitle = "2 Step Evaluation";
const chooseLabel = "Choose your trading style";
const accountLabel = "Select account size"
const bottomLabel = "Nevertheless, we cannot see that the solution proposed in this document is dependent on an amendment in section 1.10.3.";
const feeLabel = "Registration fee"

const marks = [
    {
        value: 10,
        label: '$10k',
    },
    {
        value: 25,
        label: '$25k',
    },
    {
        value: 50,
        label: '$50k',
    },
    {
        value: 100,
        label: '$100k',
    },
]

export const ChooseYourTradingStyle = observer(() => {
    const {appStore: {lang}} = useStore();

    const [tradingStyle, setTradingStyle] = useState("Normal")

    const [value, setValue] = useState<number>(30);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={style.chooseYourTradingStyle}>

            <div className={style.topWrapper}>
                <div className={style.inner}>

                    <h2 className={style.title}>
                        <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                        <span className={montserrat.className}> {translate(titles[1], lang)}</span>
                    </h2>

                    <div className={style.panel}>

                        <div className={style.stepsSection}>

                            <div className={style.stepsTop}>

                                <p className={clsx(style.panelTitle, montserrat.className)}>
                                    {translate(panelTitle, lang)}
                                </p>

                                <p className={style.chooseLabel}>
                                    {translate(chooseLabel, lang)}
                                </p>

                                <div className={style.tradingStyleBtns}>
                                    {
                                        ["Normal", "Swing"].map((_tradingStyle, key) => (
                                            <button key={key}
                                                    className={clsx({
                                                        [style.tradingStyleBtn]: true,
                                                        [style.tradingStyleBtn_selected]: _tradingStyle === tradingStyle,
                                                    })}
                                                    onClick={() => setTradingStyle(_tradingStyle)}
                                            >
                                                <span className={montserrat.className}>
                                                    {translate(_tradingStyle, lang)}
                                                </span>
                                            </button>
                                        ))
                                    }
                                </div>

                            </div>

                            <div className={style.stepsBottom}>
                                <p className={style.feeLabel}>
                                    {translate(feeLabel, lang)}
                                </p>
                                <p className={clsx(style.fee, montserrat.className)}>$70</p>
                            </div>
                        </div>

                        <div className={style.accountSection}>
                            <p className={style.accountLabel}>
                                {translate(accountLabel, lang)}
                            </p>

                            <div className={style.accountContent}>
                                <div className={style.sliderWrapper}>
                                    <Slider value={value}
                                            onChange={handleChange}
                                            min={8}
                                            max={102}
                                            step={1}
                                            marks={marks}
                                            valueLabelDisplay="on"
                                            valueLabelFormat={(x) => `$${value}k`}
                                            sx={sliderSx}
                                    />
                                </div>

                                <ButtonCustom label={translate("Get Started", lang)}
                                              className={style.startBtn}
                                              variant={ButtonVariant.blue}
                                />

                            </div>

                        </div>

                        <div className={style.bottomSection}>
                            <p className={style.bottomLabel}>
                                {translate(bottomLabel, lang)}
                            </p>
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
                    cardsNew.map((card, key) => (
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
                        cardsNew.map((card, key) => (
                            <Card key={key} lang={lang} {...card}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})

//========= SX =========//
const sliderSx = {
    borderRadius: 0,
    height: 14,
    padding: "0px!important",
    marginBottom: "0px!important",
    "& .MuiSlider-markLabel": {
        fontFamily: `"Inter", sans-serif`,
        fontWeight: 400,
        fontSize: "10px",
        lineHeight: "140%",
        color: "#9294a5",
        top: "30px",
        '@media (min-width: 768px)': {
            fontSize: "14px",
            top: "32px",
        },
    },
    "& .MuiSlider-mark": {
        height: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}

//========= CARD =========//
interface ICardComponent extends ICardNew {
    lang: LangEnum
}

const Card: FC<ICardComponent> = ({
                                      lang,
                                      title,
                                      icon,
                                      itemsBig,
                                      itemsSmall,
                                  }) => {
    return (
        <div className={style.card}>

            <div className={style.cardTop}>

                <div className={style.titleWrapper}>
                    <p className={montserrat.className}>
                        {translate(title, lang)}
                    </p>
                    {Boolean(icon) && (
                        <img src={icon} alt=""/>
                    )}
                </div>

                <div className={style.itemsBig}>
                    {
                        itemsBig.map(({icon, label, value}, key) => (
                            <div key={key}
                                 className={style.itemBig}
                            >
                                <div className={style.itemBigLeft}>
                                    {icon}
                                    <p className={style.label}>
                                        {translate(label, lang)}
                                    </p>
                                </div>

                                <p className={clsx(style.itemBigValue, montserrat.className)}>
                                    {value}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={style.cardBottom}>
                {
                    itemsSmall.map(({icon, label, value}, key) => (
                        <div key={key}
                             className={style.itemSmall}
                        >
                            <div className={style.itemSmallLeft}>
                                {icon}
                                <p className={style.label}>
                                    {translate(label, lang)}
                                </p>
                            </div>

                            <p className={clsx(style.itemSmallValue, montserrat.className)}>
                                {value}
                            </p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}