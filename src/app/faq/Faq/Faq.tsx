'use client'

import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import style from "./Faq.module.scss";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {useFormik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import {svgIcons} from "../../../assets/svgIcons";
import {faqs, IFaqItem} from "./faqs";
import {clsx} from "clsx";
import {useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";

const titles = [
    "Frequently",
    "Asked",
    "Questions",
]

export const Faq = observer(() => {
    const {appStore: {lang, setFaqItem}} = useStore();

    const [result, setResult] = useState<null | string>(null)

    const onSearch = async () => {
        setResult("Result")
    }

    const onClear = () => setResult(null);

    return (
        <div className={style.faq}>

            <div className={style.inner}>

                <h2 className={style.title}>
                    <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                    <span className={montserrat.className}> {translate(titles[1], lang)} </span>
                    <span className={montserrat.className}>{translate(titles[2], lang)}</span>
                </h2>

                <SearchForm onSearch={onSearch}
                            onClear={onClear}
                />

                <div className={style.content}>
                    {
                        result ? (
                            <>
                                {result}
                            </>
                        ) : (
                            <div className={style.sections}>
                                {
                                    faqs.map(({titleOfSection, items}, key) => (
                                        <div key={key}
                                             className={style.section}
                                        >
                                           <div className={clsx(style.titleOfSection, montserrat.className)}>
                                               {translate(titleOfSection, lang)}
                                           </div>
                                            <div className={style.items}>
                                                {
                                                    items.map((item, key) => (
                                                        <button key={key}
                                                                className={style.item}
                                                                onClick={() => setFaqItem(item)}
                                                        >
                                                            <p>{translate(item.question, lang)}</p>
                                                            {svgIcons.li_dot}
                                                        </button>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
})