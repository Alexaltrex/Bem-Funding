'use client';

import style from "./TradingUpdates.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {items} from "./data";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

const title = "Trading Updates";
const bntLabel = "See more";

export const TradingUpdates = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.tradingUpdates}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.items}>
                    {
                        items.map(({
                                       title,
                                       date,
                                       editor,
                                       text,
                                       cardTitle,
                                       cardSubtitle,
                                   }, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <div className={style.card}>
                                    <p className={style.cardDate}>
                                        {date}
                                    </p>
                                    <p className={clsx(style.cardTitle, montserrat.className)}>
                                        {cardTitle}
                                    </p>
                                    <p className={clsx(style.cardSubtitle, montserrat.className)}>
                                        {cardSubtitle}
                                    </p>
                                </div>

                                <div className={style.bottom}>
                                    <p className={clsx(style.bottomTitle, montserrat.className)}>{title}</p>

                                    <p className={style.bottomDate}>
                                        {date}
                                    </p>

                                    <p className={style.bottomEditor}>
                                        {editor}
                                    </p>

                                    <p className={style.bottomText}>
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <ButtonCustom label={translate(bntLabel, lang)}
                              className={style.btn}
                              variant={ButtonVariant.contained}
                />

            </div>
        </div>
    )
})