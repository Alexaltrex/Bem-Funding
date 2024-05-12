'use client'

import style from "./MeetWith.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";
import {cards} from "./cards";
import {icons} from "./icons";
import {clsx} from "clsx";

const pre = 'For Traders'

const titles = [
    "Meet with our trading",
    "opportunities",
]


export const MeetWith = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.meetWith}>
            <div className={style.inner}>

                <p className={style.pre}>
                    {translate(pre, lang)}
                </p>

                <h2 className={style.title}>
                    <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                    <span className={montserrat.className}> {translate(titles[1], lang)}</span>
                </h2>

                <div className={style.cards}>
                    {
                        cards.map(({label, description}, key) => (
                            <div key={key}
                                 className={style.card}
                            >
                                {icons[key]}
                                <p className={clsx(style.cardLabel, montserrat.className)}>
                                    {translate(label, lang)}
                                </p>
                                <p className={style.description}>
                                    {translate(description, lang)}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})