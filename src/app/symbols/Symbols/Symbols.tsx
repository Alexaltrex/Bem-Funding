'use client'

import style from "./Symbols.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat, robotoMono} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {clsx} from "clsx";
import {FC, useEffect, useRef, useState} from "react";
import {svgIcons} from "../../../assets/svgIcons";
import {Collapse} from "@mui/material";
import {dataNew, daysOfWeek, IExchange} from "./dataNew";
import {FormikHelpers} from "formik/dist/types";
import {useFormik} from "formik";
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import {convertSecondsToCountdown, getWords, getWorkStatus, searchExchanges} from "./helpers";
import moment from 'moment-timezone';

const title = "Symbols";
const descriptions = [
    "Here, you can see the pairs available on our platform along with their market hours. However, please note that these data are not dynamically updated. In case of any system issues, updates, or holidays, you can find the relevant information on our Discord and in the Trading Updates section.",
    "Please note that the trading hours for cryptocurrency pairs over the weekend may vary depending on ongoing maintenance."
]

export const Symbols = observer(() => {
    const {appStore: {lang}} = useStore();

    const [marketIndex, setMarketIndex] = useState(0)
    const [exchanges, setExchanges] = useState(dataNew[marketIndex].exchanges)

    const onMarket = (index: number) => {
        setMarketIndex(index);
        setExchanges(dataNew[index].exchanges)
        formik.resetForm();
    }

    // search
    interface IValues {
        value: string
    }

    const initialValues = {
        value: ""
    }
    const onSubmit = ({value}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        if (value) {
            setExchanges(searchExchanges({lang, marketIndex, subString: value}))
            // const groups = searchGroups(json as ILexiconItem[], value);
            // setGroups(groups);
            // if (groups.length > 0) {
            //     setLexiconGroup(groups[0])
            // }
            // setLetter("");
        } else {
            //setMarketIndex(marketIndex);
            setExchanges(dataNew[marketIndex].exchanges);
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    })
    const onClear = () => {
        //setMarketIndex(0);
        setExchanges(dataNew[marketIndex].exchanges);
        formik.resetForm();
    }

    // dropdown
    const [words, setWords] = useState<string[]>([]);
    const onWord = (word: string) => {
        formik.setFieldValue("value", word);
        setWords([]);
        formik.submitForm();
    }
    const ref = useRef<HTMLDivElement>(null!);
    useOutsideClick(ref, () => setWords([]));

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

                    <div className={style.markets}>
                        {
                            dataNew.map(({marketName}, key) => (
                                <button key={key}
                                        onClick={() => onMarket(key)}
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

                    <div className={style.formWrapper}>

                        <form onSubmit={formik.handleSubmit}
                              className={style.searchForm}
                              autoComplete="off"
                        >

                            <input name="value"
                                   placeholder={translate("Write here", lang) + "..."}
                                   value={formik.values.value}
                                   onBlur={formik.handleBlur}
                                   onChange={(e) => {
                                       formik.handleChange(e);
                                       if (e.target.value) {
                                           setWords(getWords({
                                               lang,
                                               marketIndex,
                                               subString: e.target.value
                                           }));
                                       }
                                   }}
                            />

                            {
                                formik.values.value && (
                                    <button onClick={() => onClear()}
                                    >
                                        {svgIcons.close_gradient}
                                    </button>
                                )
                            }

                            <button type="submit">
                                {svgIcons.search}
                            </button>
                        </form>

                        {
                            Boolean(words.length) && (
                                <div className={style.dropdownWrapper}
                                     ref={ref}
                                >
                                    {
                                        words.map((_word, key) => (
                                            <button key={key}
                                                    onClick={() => onWord(_word)}
                                            >
                                                {_word}
                                            </button>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {
                    exchanges.length > 0 ? (
                        <div className={style.rows}>
                            {
                                exchanges.map((exchange, key) => (
                                    <Row key={marketIndex + exchange.abbreviation}
                                         lang={lang}
                                         {...exchange}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <p className={clsx(style.noResult, style.rows)}>
                            {translate("No search result", lang)}

                        </p>
                    )
                }


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

    const [active, setActive] = useState(false);
    const [secondsBefore, setSecondsBefore] = useState(-1)

    //console.log(convertSecondsToCountdown(secondsBefore))

    useEffect(() => {
        const timeId = setInterval(() => {
            const {active, secondsBefore} = getWorkStatus(tradingHours);
            setActive(active);
            setSecondsBefore(secondsBefore);
        }, 1000)
        return () => clearInterval(timeId)
    }, [])

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

                {
                    secondsBefore > 0 && (
                        <p className={clsx({
                            [style.right]: true,
                            [style.right_active]: active,
                        })}>
                            {
                                active
                                    ? lang === LangEnum.ENG
                                    ? (
                                        <>
                                            <span>Market will close in </span><span
                                            className={robotoMono.className}>{convertSecondsToCountdown(secondsBefore)}</span>
                                        </>
                                    )
                                    : (
                                        <>
                                            <span>Piyasa </span><span>{convertSecondsToCountdown(secondsBefore)}</span><span> içinde kapanacak</span>
                                        </>
                                    )
                                    : lang === LangEnum.ENG
                                    ? (
                                        <>
                                            <span>Market will open in </span><span
                                            className={robotoMono.className}>{convertSecondsToCountdown(secondsBefore)}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Piyasa </span><span>{convertSecondsToCountdown(secondsBefore)}</span><span> içinde açılacak</span>
                                        </>
                                    )
                            }
                        </p>
                    )
                }

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
                            {`${translate("Trading Hours", lang)}  (GMT +3)`}
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