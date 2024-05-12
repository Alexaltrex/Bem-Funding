'use client'

import style from "./Symbols.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useRef, useState} from "react";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";
import {data, IDataItem} from "./data";
import {svgIcons} from "../../../assets/svgIcons";
import {Collapse} from "@mui/material";

const title = "Symbols";
const description = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.";

export const Symbols = observer(() => {
    const {appStore: {lang}} = useStore();

    const [index, setIndex] = useState(0)


    return (
        <div className={style.symbols}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <p className={style.description}>
                    {translate(description, lang)}
                </p>

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
                            <Row key={key} {...row}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
})

//========= ROW =========//
const Row: FC<IDataItem> = ({
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
                            Trading Hours (GMT +1)
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