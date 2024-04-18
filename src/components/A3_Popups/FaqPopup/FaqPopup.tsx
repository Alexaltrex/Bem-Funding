'use client'

import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import style from "./FaqPopup.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

const buttonLabel = "Go back";

export const FaqPopup = observer(() => {
    const {
        appStore: {
            lang,
            faqItem, setFaqItem
        }
    } = useStore();

    return (
        <>
            {
                faqItem && (
                    <div className={style.faqPopup}>
                        <div className={style.card}>
                            <button className={style.closeBtn}
                                    onClick={() => setFaqItem(null)}
                            >
                                {svgIcons.close}
                            </button>
                            <p className={clsx(style.cardTitle, montserrat.className)}>
                                {translate(faqItem.question, lang)}
                            </p>

                            <div className={style.cardTexts}>
                                {
                                    faqItem.answer.map((text, key) => (
                                        <p key={key}>
                                            {translate(text, lang)}
                                        </p>
                                    ))
                                }
                            </div>

                            <ButtonCustom label={translate(buttonLabel, lang)}
                                          variant={ButtonVariant.blue}
                                          className={style.backBtn}
                                          onClick={() => setFaqItem(null)}
                            />
                        </div>
                    </div>
                )
            }

        </>

    )
})