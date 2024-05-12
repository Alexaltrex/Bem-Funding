'use client'


import style from "./EconomicCalendar.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {useState} from "react";
import {CheckboxCustom} from "../../../components/_common/CheckboxCustom/CheckboxCustom";
import {FieldTimezone} from "../../../components/_common/FieldTimezone/FieldTimezone";
import {svgIcons} from "../../../assets/svgIcons";
import {data} from "./data";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Swiper as SwiperClass} from "swiper/types";

const title = 'Economic Calendar';

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
]


export const EconomicCalendar = observer(() => {
    const {appStore: {lang}} = useStore();

    const [day, setDay] = useState(days[0])
    const [low, setLow] = useState(false);
    const [medium, setMedium] = useState(false);
    const [high, setHigh] = useState(false);
    const [holiday, setHoliday] = useState(false);

    const [restrictions, setRestrictions] = useState(false);
    const [noRestrictions, setNoRestrictions] = useState(false);

    const [timeZoneIndex, setTimeZoneIndex] = useState(0);

    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const pageCount = 4;
    const [page, setPage] = useState(0)

    return (
        <div className={style.economicCalendar}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.days}>
                    {
                        days.map((_day, key) => (
                            <button key={key}
                                    onClick={() => setDay(_day)}
                                    className={clsx({
                                        [style.dataBtn]: true,
                                        [style.dataBtn_selected]: _day === day,
                                    })}
                            >
                                <span>{translate(_day, lang)}</span>
                            </button>
                        ))
                    }
                </div>

                <div className={style.card}>

                    <div className={style.cardHeader}>

                        <div className={style.impactRestrictionsWrapper}>

                            <div className={style.impactWrapper}>
                                <p className={clsx(style.wrapperTitle, montserrat.className)}>
                                    {translate("Impact", lang)}
                                </p>

                                <div className={style.checkboxes}>
                                    {
                                        [
                                            {
                                                checked: low,
                                                onClick: () => setLow(!low),
                                                label: "Low"
                                            },
                                            {
                                                checked: medium,
                                                onClick: () => setMedium(!medium),
                                                label: "Medium"
                                            },
                                            {
                                                checked: high,
                                                onClick: () => setHigh(!high),
                                                label: "High"
                                            },
                                            {
                                                checked: holiday,
                                                onClick: () => setHoliday(!holiday),
                                                label: "Holiday"
                                            },
                                        ].map(({checked, onClick, label}, key) => (
                                            <div key={key}
                                                 className={style.checkboxWrapper}
                                                 onClick={() => onClick()}
                                            >
                                                <CheckboxCustom
                                                    className={clsx(style.checkbox, style[`checkbox${key}`])}
                                                    checked={checked}
                                                    onClick={() => onClick()}

                                                />
                                                <p className={style.checkboxLabel}>
                                                    {translate(label, lang)}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>

                            <div className={style.restrictionsWrapper}>
                                <p className={clsx(style.wrapperTitle, montserrat.className)}>
                                    {translate("Restrictions", lang)}
                                </p>

                                <div className={style.checkboxes}>
                                    {
                                        [
                                            {
                                                checked: restrictions,
                                                onClick: () => setRestrictions(!restrictions),
                                                label: "Restrictions"
                                            },
                                            {
                                                checked: noRestrictions,
                                                onClick: () => setNoRestrictions(!noRestrictions),
                                                label: "No restrictions"
                                            },
                                        ].map(({checked, onClick, label}, key) => (
                                            <div key={key}
                                                 className={style.checkboxWrapper}
                                                 onClick={() => onClick()}
                                            >
                                                <CheckboxCustom
                                                    className={clsx(style.checkbox, style[`checkbox${key}`])}
                                                    checked={checked}
                                                    onClick={() => onClick()}

                                                />
                                                <p className={style.checkboxLabel}>
                                                    {translate(label, lang)}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                        <div className={style.timezoneWrapper}>

                            <p className={clsx(style.wrapperTitle, montserrat.className)}>
                                {translate("Time zone", lang)}
                            </p>

                            <div className={style.timezoneContent}>

                                <FieldTimezone timeZoneIndex={timeZoneIndex}
                                               onSelectHandler={(index: number) => setTimeZoneIndex(index)}
                                               className={style.fieldTimezone}
                                />

                                <button className={style.exportBtn}>
                                    <p>{translate("Export", lang)}</p>
                                    {svgIcons.arrow_down_select}
                                </button>
                            </div>

                        </div>

                    </div>

                    <div className={style.tableTablet}>

                        <div className={style.tableHeader}>
                            {
                                [
                                    "Name",
                                    "Instrument",
                                    "Dates",
                                    "Forecast",
                                    "Previous",
                                ].map((label, key) => (
                                    <div key={key}
                                         className={clsx(style.headerCell)}
                                    >
                                        <p>
                                            {translate(label, lang)}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.tableBody}>
                            {
                                data.map(({
                                              dotColor,
                                              description,
                                              date,
                                              date_status,
                                              forecast,
                                              previous,
                                          }, key) => (
                                    <div key={key}
                                         className={style.tableBodyRow}
                                    >
                                        <div className={style.descriptionCell}>
                                            <div className={style.dot}
                                                 style={{background: dotColor}}
                                            />
                                            <p>{description}</p>
                                        </div>

                                        <div className={style.instrumentCell}>
                                            {svgIcons.flag_eng}
                                            <p>ENG</p>
                                        </div>

                                        <div className={style.datesCell}>
                                            <p>{date}</p>
                                            <p>{date_status}</p>
                                        </div>

                                        <div className={style.forecast}>
                                            <p>{forecast}</p>
                                        </div>

                                        <div className={style.forecast}>
                                            <p>{previous}</p>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <Swiper className={style.tableMobile}
                            slidesPerView={1}
                            onSwiper={swiper => setSwiper(swiper)}
                            onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}

                    >
                        <SwiperSlide className={style.slide0}>

                            <div className={style.tableHeader}>
                                {
                                    [
                                        "Name",
                                        "Instrument",
                                    ].map((label, key) => (
                                        <div key={key}
                                             className={clsx(style.headerCell)}
                                        >
                                            <p>{translate(label, lang)}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={style.tableBody}>
                                {
                                    data.map(({
                                                  dotColor,
                                                  description,
                                              }, key) => (
                                        <div key={key}
                                             className={style.tableBodyRow}
                                        >
                                            <div className={style.descriptionCell}>
                                                <div className={style.dot}
                                                     style={{background: dotColor}}
                                                />
                                                <p>{description}</p>
                                            </div>

                                            <div className={style.instrumentCell}>
                                                {svgIcons.flag_eng}
                                                <p>ENG</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>

                        </SwiperSlide>

                        <SwiperSlide className={style.slide1}>

                            <div className={style.tableHeader}>
                                {
                                    [

                                        "Dates",
                                    ].map((label, key) => (
                                        <div key={key}
                                             className={clsx(style.headerCell)}
                                        >
                                            <p>
                                                {translate(label, lang)}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={style.tableBody}>
                                {
                                    data.map(({
                                                  date,
                                                  date_status,
                                              }, key) => (
                                        <div key={key}
                                             className={style.tableBodyRow}
                                        >
                                            <div className={style.datesCell}>
                                                <p>{date}</p>
                                                <p>{date_status}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </SwiperSlide>

                        <SwiperSlide className={style.slide2}>

                            <div className={style.tableHeader}>
                                {
                                    [
                                        "Forecast",
                                        "Previous",
                                    ].map((label, key) => (
                                        <div key={key}
                                             className={clsx(style.headerCell)}
                                        >
                                            <p>
                                                {translate(label, lang)}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={style.tableBody}>
                                {
                                    data.map(({
                                                  forecast,
                                                  previous,
                                              }, key) => (
                                        <div key={key}
                                             className={style.tableBodyRow}
                                        >
                                            <div className={style.forecast}>
                                                <p>{forecast}</p>
                                            </div>

                                            <div className={style.forecast}>
                                                <p>{previous}</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>

                        </SwiperSlide>
                    </Swiper>

                    <div className={style.navigator}>
                        <div className={style.runner}
                             style={{
                                 left: `${currentIndex * 100 / 3}%`
                             }}
                        />
                    </div>

                    <div className={style.pagination}>
                        {
                            Array
                                .from({length: pageCount}, (v, k) => k)
                                .map(key => (
                                    <button key={key}
                                            className={clsx({
                                                [style.paginationBtn]: true,
                                                [style.paginationBtn_selected]: page === key,
                                            })}
                                            onClick={() => setPage(key)}
                                    >
                                        <span>{key + 1}</span>
                                    </button>
                                ))
                        }
                    </div>


                </div>

            </div>
        </div>
    )
})