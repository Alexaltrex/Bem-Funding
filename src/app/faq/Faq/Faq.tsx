'use client'

import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import style from "./Faq.module.scss";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {useFormik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import {svgIcons} from "../../../assets/svgIcons";
import {faqs, IItem} from "./faqs";
import {clsx} from "clsx";
import {useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

const titles = [
    "Frequently",
    "Asked",
    "Questions",
]

const buttonLabel = "Go back";

interface IValues {
    value: string
}

const initialValues = {value: ""}

export const Faq = observer(() => {
    const {appStore: {lang}} = useStore();

    const onSubmit = (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    const [item, setItem] = useState<IItem | null>(null)

    return (
        <div className={style.faq}>

            {
                item && (
                    <div className={style.popup}>
                       <div className={style.card}>
                            <button className={style.closeBtn}
                                    onClick={() => setItem(null)}
                            >
                                {svgIcons.close}
                            </button>
                           <p className={clsx(style.cardTitle, montserrat.className)}>
                               {translate(item.question, lang)}
                           </p>

                           <div className={style.cardTexts}>
                               {
                                   item.answer.map((text, key) => (
                                       <p key={key}>
                                           {translate(text, lang)}
                                       </p>
                                   ))
                               }
                           </div>

                            <ButtonCustom label={translate(buttonLabel, lang)}
                                          variant={ButtonVariant.blue}
                                          className={style.backBtn}
                                          onClick={() => setItem(null)}
                            />
                       </div>
                    </div>
                )
            }

            <div className={style.inner}>

                <h2 className={style.title}>
                    <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                    <span className={montserrat.className}> {translate(titles[1], lang)} </span>
                    <span className={montserrat.className}>{translate(titles[2], lang)}</span>
                </h2>

                <form onSubmit={formik.handleSubmit}
                      className={style.form}
                >

                    <input name="value"
                           placeholder="Write here..."
                           value={formik.values.value}
                           onBlur={formik.handleBlur}
                           onChange={(e) => {
                               formik.handleChange(e);
                               setTimeout(() => {
                                   formik.submitForm();
                               }, 0)
                           }}


                    />

                    <button onClick={() => {
                        if (formik.values.value) {
                            formik.resetForm();
                        }
                    }}
                    >
                        {
                            formik.values.value ? svgIcons.close_gradient : svgIcons.search
                        }
                    </button>

                    {
                        formik.touched.value && formik.errors.value && (
                            <div>
                                {formik.errors.value}
                            </div>
                        )
                    }

                </form>

                <div className={style.content}>
                    {
                        formik.values.value ? (
                            <>
                                Result
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
                                                                onClick={() => setItem(item)}
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