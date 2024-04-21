'use client'

import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import style from "./FaqPopup.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

const buttonLabel = "Go back";

export const FaqPopup = observer(() => {
    const {
        appStore: {
            lang,
            faqItem, setFaqItem
        }
    } = useStore();

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(appRef.current, {
            scale: faqItem ? 1 : 0.8,
            opacity: faqItem ? 1 : 0,
            display: faqItem ? "flex" : "none",
            duration: 0.3,
        });

    }, {dependencies: [faqItem], scope: appRef});

    return (
        <div className={style.faqPopup}
             ref={appRef}
        >
            {
                faqItem && (
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

                        <p className={style.needSupport}>
                            {translate("Need support?", lang)} <Link href="/contact"
                                                                     onClick={() => setFaqItem(null)}
                        >
                            {translate("Contact Us?", lang)}
                            </Link>
                        </p>
                    </div>
                )
            }
        </div>
    )
})