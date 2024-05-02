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
        lexiconGroup,
        lexiconPopup, setLexiconPopup
    }} = useStore();

    const ref = useRef<HTMLDivElement>(null!);

    useOutsideClick(ref, () => setLexiconPopup(false))

    return (
        <>
            {
                lexiconGroup && lexiconPopup && (
                    <div className={style.lexiconPopup}>

                        <div className={style.card}
                             ref={ref}
                        >
                            <button className={style.closeBtn}
                                    onClick={() => setLexiconPopup(null)}
                            >
                                {svgIcons.close}
                            </button>

                            <p className={clsx(style.groupInfo_title, montserrat.className)}>
                                {lexiconGroup.title}
                            </p>
                            <p className={style.groupInfo_content}>
                                {lexiconGroup.content}
                            </p>

                            <div className={style.groupSubtitles}>
                                {
                                    lexiconGroup.subtitles.map(({subtitle, content}, key) => (
                                        <div key={key}
                                             className={style.groupSubtitle}
                                        >
                                            <p className={clsx(style.groupSubtitle_subtitle, montserrat.className)}>{subtitle}</p>
                                            <p className={style.groupSubtitle_content}>{content}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                    </div>
                )

            }
        </>
    )
})