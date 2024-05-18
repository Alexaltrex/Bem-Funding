'use client'

import style from "./Symbols.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useState} from "react";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";
import {svgIcons} from "../../../assets/svgIcons";
import {Collapse} from "@mui/material";
import {dataNew, daysOfWeek, IExchange} from "./dataNew";

const title = "Symbols";
const descriptions = [
    "Here, you can see the pairs available on our platform along with their market hours. However, please note that these data are not dynamically updated. In case of any system issues, updates, or holidays, you can find the relevant information on our Discord and in the Trading Updates section.",
    "Please note that the trading hours for cryptocurrency pairs over the weekend may vary depending on ongoing maintenance."
]

export const Symbols = observer(() => {
    const {appStore: {lang}} = useStore();

    const [marketIndex, setMarketIndex] = useState(0)


    return (
        <div className={style.symbols}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.descriptions}>
                    {
                        descriptions.map((description, key) => (
                            <p key={key}>
                                {translate(description, lang)}
                            </p>
                        ))
                    }
                </div>

                <div className={style.selectBlock}>

                    <div className={style.labels}>
                        {
                            dataNew.map(({marketName}, key) => (
                                <button key={key}
                                        onClick={() => setMarketIndex(key)}
                                        className={clsx({
                                            [style.labelBtn]: true,
                                            [style.labelBtn_selected]: marketIndex === key,
                                        })}
                                >
                                    <span>{marketName[lang]}</span>
                                </button>
                            ))
                        }
                    </div>

                    <SearchForm onSearch={async () => {
                    }}
                                onClear={() => {
                                }}
                                className={style.searchForm}
                    />

                </div>

                <div className={style.rows}>
                    {
                        dataNew[marketIndex].exchanges.map((exchange, key) => (
                            <Row key={key} lang={lang} {...exchange}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
})

//========= ROW =========//
interface IRow extends IExchange {
    lang: LangEnum
}

const Row: FC<IRow> = ({
                           lang,
                           abbreviation,
                           fullName,
                           contractSize,
                           marginPercent,
                           leverageNormal,
                           leverageSwing,
                           commission,
                           commissionType,
                           tradingHours,

                       }) => {
    const [open, setOpen] = useState(false);

    let active = true;
    let statusLabel = '';

    // "Monday" 1
    // "Tuesday" 2
    // "Wednesday" 3
    // "Thursday" 4
    // "Friday" 5
    // "Saturday" 6
    // "Sunday" 0

    const day = (new Date()).getDay();

    const startTime = tradingHours[0].slice(0, 5);
    const endTime = tradingHours[0].slice(-5);

    if (day === 6 || day === 0) {
        active = false
    } else {
        const realDayIndex = day - 1
        //console.log(realDayIndex)
        //console.log(tradingHours[0].slice(0,5))
        const hoursStart = Number(tradingHours[0].slice(0, 2));
        const minutesStart = Number(tradingHours[0].slice(3, 5));
        const start = hoursStart * minutesStart;
        const hoursEnd = Number(tradingHours[0].slice(-5, -3));
        const minutesEnd = Number(tradingHours[0].slice(-2));
        const end = hoursEnd * minutesEnd;
        const hours = (new Date()).getHours();
        const minutes = (new Date()).getMinutes();
        const now = hours * minutes;

        if (now >= start && now <= end) {
            active = true
        } else {
            active = false
        }
    }


    return (
        <div className={style.rowComponent}>

            <div className={clsx({
                [style.rowInner]: true,
                [style.rowInner_open]: open,
            })}
                 onClick={() => setOpen(!open)}
            >

                {svgIcons.arrow_down}

                <div className={style.left}>
                    <div className={clsx({
                        [style.dot]: true,
                        [style.dot_active]: active,
                    })}
                    />
                    <p className={clsx(style.label, montserrat.className)}>
                        {abbreviation}
                    </p>
                    <p className={style.rowTitle}>
                        {fullName[lang]}
                    </p>
                </div>

                <p className={clsx({
                    [style.right]: true,
                    [style.right_active]: active,
                })}>
                    {
                        active
                            ? (lang === LangEnum.ENG ? `Market will close in ${endTime}` : `Piyasa ${endTime} içinde kapanacak`)
                            : (lang === LangEnum.ENG ? `Market will open in ${startTime}` : `Piyasa ${startTime} içinde açılacak`)
                    }
                </p>

            </div>

            <Collapse in={open}>
                <div className={style.dropDown}>
                    <div className={style.dropDownLeft}>
                        <p className={clsx(style.dropDownTitle, montserrat.className)}>
                            {translate("Information", lang)}
                        </p>

                        <div className={style.dropDownContent}>
                            {
                                [
                                    {
                                        label: "Contract size",
                                        value: contractSize,
                                    },
                                    {
                                        label: "Margin percent",
                                        value: marginPercent,
                                    },
                                    {
                                        label: "Leverage normal",
                                        value: leverageNormal,
                                    },
                                    {
                                        label: "Leverage swing",
                                        value: leverageSwing,
                                    },
                                    {
                                        label: "Commission",
                                        value: commission + (Boolean(commissionType) ? `, ${commissionType}` : ""),
                                    },
                                ].map(({label, value}, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        <p className={style.label}>
                                            {label}
                                        </p>
                                        <p className={clsx(style.value, montserrat.className)}>
                                            {value}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className={style.dropDownRight}>

                        <p className={clsx(style.dropDownTitle, montserrat.className)}>
                            {translate("Trading Hours (GMT +1)", lang)}
                        </p>

                        <div className={style.dropDownContent}>
                            {
                                tradingHours.map((tradingHours, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        <p className={style.label}>
                                            {translate(daysOfWeek[key], lang)}
                                        </p>
                                        <p className={style.value}>
                                            {tradingHours}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}