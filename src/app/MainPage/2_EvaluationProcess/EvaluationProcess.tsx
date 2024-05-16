'use client'

import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import style from "./EvaluationProcess.module.scss"
import {LangEnum, translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";
import {cards, ICard} from "./cards";
import {FC} from "react";
import {clsx} from "clsx";
import 'swiper/css';

const titles = [
    "Evaluation",
    "Process",
]

export const EvaluationProcess = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.evaluationProcess}>
            <div className={style.inner}>
                <div className={style.titleWrapper}>
                    <div className={style.inner}>
                        <h2 className={style.title}>
                            <span className={montserrat.className}>{translate(titles[0], lang)}</span>
                            <span className={montserrat.className}> {translate(titles[1], lang)}</span>

                        </h2>
                    </div>
                </div>

                <div className={style.cards}>
                    <div className={style.cardsTop}>
                        <Card {...cards[0]} lang={lang} index={0}/>
                        <Card {...cards[1]} lang={lang} index={1}/>
                    </div>

                    <Card {...cards[2]} lang={lang} index={2}/>
                </div>
            </div>


        </div>
    )
})

//========= CARD =========//
interface ICardComponent extends ICard {
    lang: LangEnum
    className?: string
    index: number
}

const Card: FC<ICardComponent> = ({
                                      lang, phase,
                                      title,
                                      subtitle,
                                      descriptions,
                                      src,
                                      figure,
                                      className,
                                      index,
                                      extra

                                  }) => {
    return (
        <div className={clsx(style.card, style[`card_${index}`])}
        >

            <img src={src} alt="" className={style.back}/>
            <img src={figure} alt="" className={style.figure}/>
            {extra && <img src={extra} alt="" className={style.extra}/>}

            <div className={style.content}>

                <p className={style.phase}>
                    {translate(phase, lang)}
                </p>

                <p className={clsx(style.cardTitle, montserrat.className)}>
                    {translate(title, lang)}
                </p>

                {
                    subtitle && (
                        <p className={clsx(style.subtitle, montserrat.className)}>
                            {translate(subtitle, lang)}
                        </p>
                    )
                }

                <div className={clsx(style.descriptions)}>
                    {
                        descriptions.map((description, key) => (
                            <p key={key}>{translate(description, lang)}</p>
                        ))
                    }

                </div>
            </div>


        </div>
    )
}