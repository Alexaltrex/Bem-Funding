'use client'

import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import style from "./LexiconPopup.module.scss"
import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import {useRef} from "react";

export const LexiconPopup = observer(() => {
    const {appStore: {
        lexiconSubtitle, setLexiconSubtitle
    }} = useStore();

    const ref = useRef<HTMLDivElement>(null!);

    useOutsideClick(ref, () => setLexiconSubtitle(null))

    return (
        <>
            {
                lexiconSubtitle && (
                    <div className={style.lexiconPopup}>

                        <div className={style.card}
                             ref={ref}
                        >
                            <button className={style.closeBtn}
                                    onClick={() => setLexiconSubtitle(null)}
                            >
                                {svgIcons.close}
                            </button>

                            <p className={clsx(style.subtitle, montserrat.className)}>
                                {lexiconSubtitle.subtitle}
                            </p>

                            <p className={style.content}>
                                {lexiconSubtitle.content}
                            </p>
                        </div>


                    </div>
                )

            }
        </>
    )
})