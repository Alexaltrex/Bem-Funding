'use client'

import style from "./NewEra.module.scss"
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {cards} from "./cards";
import {clsx} from "clsx";

const pre = 'NEW ERA'

const titles = [
    "Launch Into",
    "The New Era Of Trading",
]

export const NewEra = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.newEra}>
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
                        cards.map(({icon, label, description}, key) => (
                            <div key={key}
                                 className={style.card}
                            >
                                {icon}

                                <p className={clsx(style.label, montserrat.className)}>
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