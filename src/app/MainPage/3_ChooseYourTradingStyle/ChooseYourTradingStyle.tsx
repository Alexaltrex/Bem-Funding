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
import {
    accountLabel,
    bottomLabel,
    chooseLabel,
    data,
    feeLabel,
    getStartedHrefs,
    ICardNew,
    marks,
    panelTitle,
    titles
} from "./data";
import {ClickAwayListener, Tooltip, useMediaQuery} from "@mui/material";
import {svgIcons} from "../../../assets/svgIcons";

export const ChooseYourTradingStyle = observer(() => {
    const {appStore: {lang}} = useStore();

    const [tradingStyle, setTradingStyle] = useState("Normal")

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    //console.log(value)

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
                                <div className={style.stepsBottomItem}>
                                    <p className={style.feeLabel}>
                                        {translate(feeLabel, lang)}
                                    </p>
                                    <p className={clsx(style.fee, montserrat.className)}>
                                        {marks[value].registrationFee}
                                    </p>
                                </div>

                                <div className={style.stepsBottomItem}>
                                    <p className={style.feeLabel}>
                                        {translate("10% discount", lang)}
                                    </p>
                                    <p className={clsx(style.fee, montserrat.className)}>
                                        {marks[value].discountedFee}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className={style.accountSection}>
                            <p className={style.accountLabel}>
                                {translate(accountLabel, lang)}
                            </p>

                            <div className={style.accountContent}>
                                <div className={style.sliderWrapper}>
                                    <div className={style.before}/>
                                    <Slider value={value}
                                            onChange={handleChange}
                                            min={0}
                                            max={3}
                                            step={1}
                                            marks={true}
                                            valueLabelDisplay="off"
                                            valueLabelFormat={(x) => `$${value}k`}
                                            sx={sliderSx}
                                    />
                                    <div className={style.after}/>

                                    <div className={style.marksWrapper}>
                                        {
                                            ["$10k", "$25k", "$50k", "$100k"].map((_value, key) => (
                                                <p key={key}
                                                   className={clsx({
                                                       [style.mark]: true,
                                                       [style.mark_selected]: key === value,
                                                   })}
                                                   style={{
                                                       left: `${key * 33.33}%`
                                                   }}
                                                >
                                                    {_value}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>

                                <ButtonCustom label={translate("Get Started", lang)}
                                              className={style.startBtn}
                                              variant={ButtonVariant.blue}
                                              //@ts-ignore
                                              href={getStartedHrefs[value][tradingStyle]}
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
                    data.map((card, key) => (
                        <SwiperSlide key={key}
                                     className={style.slide}

                        >
                            <Card lang={lang} tradingStyle={tradingStyle} {...card}/>
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
                        data.map((card, key) => (
                            <Card key={key} lang={lang} tradingStyle={tradingStyle} {...card}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
});

//========= SX =========//
const sliderSx = {
    zIndex: 2,
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
    tradingStyle: string
}

const Card: FC<ICardComponent> = ({
                                      lang,
                                      tradingStyle,
                                      title,
                                      icon,
                                      itemsBig,
                                      itemsSmall,
                                  }) => {
    const matchDesktop = useMediaQuery('(min-width:1140px)');

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };


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
                                    {translate(value, lang)}
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

                                <Tooltip title="Tooltip content"
                                         placement="top"
                                         arrow={true}
                                         enterTouchDelay={1}
                                >
                                                <span className={style.info}>
                                                    {svgIcons.info_circle}
                                                </span>
                                </Tooltip>

                            </div>

                            <p className={clsx(style.itemSmallValue, montserrat.className)}>
                                {translate(
                                    key === 4
                                        ? tradingStyle === "Normal" ? "1:100" : "1:30"
                                        : value,
                                    lang)}
                            </p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}