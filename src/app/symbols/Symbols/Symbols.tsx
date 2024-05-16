'use client'

import style from "./Symbols.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useRef, useState} from "react";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";
import {data, IDataItem} from "./data";
import {svgIcons} from "../../../assets/svgIcons";
import {Collapse} from "@mui/material";

const title = "Symbols";
const descriptions = [
    "Here, you can see the pairs available on our platform along with their market hours. However, please note that these data are not dynamically updated. In case of any system issues, updates, or holidays, you can find the relevant information on our Discord and in the Trading Updates section.",
    "Please note that the trading hours for cryptocurrency pairs over the weekend may vary depending on ongoing maintenance."
]

export const Symbols = observer(() => {
    const {appStore: {lang}} = useStore();

    const [index, setIndex] = useState(0)


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
                            [
                                "Forex",
                                "Exotics",
                                "Metal CFD",
                                "Cash CFD",
                                "Crypto",
                            ].map((label, key) => (
                                <button key={key}
                                        onClick={() => setIndex(key)}
                                        className={clsx({
                                            [style.labelBtn]: true,
                                            [style.labelBtn_selected]: index === key,
                                        })}
                                >
                                    <span>{translate(label, lang)}</span>
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
                        data.map((row, key) => (
                            <Row key={key} lang={lang} {...row}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
})

//========= ROW =========//
interface IRow extends IDataItem {
    lang: LangEnum
}

const Row: FC<IRow> = ({
                           lang,
                           active,
                           label,
                           title,
                           timeEnd,
                           information: {
                               contractSize,
                               marginPercent,
                               leverageNormal,
                               leverageSwing,
                               commisionType,
                           },
                           tradingHours
                       }) => {
    const [open, setOpen] = useState(false);


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
                        {label}
                    </p>
                    <p className={style.rowTitle}>
                        {title}
                    </p>
                </div>

                <p className={clsx({
                    [style.right]: true,
                    [style.right_active]: active,
                })}>
                    Market will close in {timeEnd}
                </p>

            </div>

            <Collapse in={open}>
                <div className={style.dropDown}>
                    <div className={style.dropDownLeft}>
                        <p className={clsx(style.dropDownTitle, montserrat.className)}>
                            Information
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
                                        label: "Commission type",
                                        value: commisionType,
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
                            {translate("Trading Hours", lang)} (GMT +1)
                        </p>

                        <div className={style.dropDownContent}>
                            {
                                [
                                    {
                                        label: "Monday",
                                        value: tradingHours[0],
                                    },
                                    {
                                        label: "Tuesday",
                                        value: tradingHours[1],
                                    },
                                    {
                                        label: "Wednesday",
                                        value: tradingHours[2],
                                    },
                                    {
                                        label: "Thursday",
                                        value: tradingHours[3],
                                    },
                                    {
                                        label: "Friday",
                                        value: tradingHours[4],
                                    },
                                    {
                                        label: "Saturday",
                                        value: tradingHours[5],
                                    },
                                    {
                                        label: "Sunday",
                                        value: tradingHours[6],
                                    },

                                ].map(({label, value}, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        <p className={style.label}>
                                            {label}
                                        </p>
                                        <p className={style.value}>
                                            {value}
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