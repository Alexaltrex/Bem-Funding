'use client'

import style from "./MarketHours.module.scss"
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {useState} from "react";

const title = "Market Hours";
const description = "When does the forex market open? Use the Forex Market Time Zone Converte tool below to view the open and close times of the main forex trading sessions in your own local time zone.";

export const MarketHours = observer(() => {
    const {appStore: {lang}} = useStore();

    const [hourTime, setHourTime] = useState(true);

    return (
        <div className={style.marketHours}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <p className={style.description}>
                    {translate(description, lang)}
                </p>

                <div className={style.card}>

                    <div className={style.top}>

                        <p className={clsx(style.topTitle,)}>
                            {translate("Market Time Zone Converter", lang)}
                        </p>

                        <div className={style.switcherWrapper}
                             onClick={() => setHourTime(!hourTime)}
                        >

                            <p className={style.switcherWrapperLabel}>
                                24 hour time
                            </p>

                            <div className={style.switcher}>
                                <div className={clsx({
                                    [style.dot]: true,
                                    [style.dot_hourTime]: hourTime,
                                })}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={style.info}>

                    <div className={style.infoItem}>

                        <p className={clsx(style.infoItemTitle, montserrat.className)}>
                            How to use the Forex Market Time Zone Converter
                        </p>
                        <p className={clsx(style.text, style.textMargin)}>
                            The forex market is open 24 hours a day during the weekdays which allows traders to
                            potentially trade all day and all night. Knowing the forex market’s operating hours is
                            essential for a trader. You need to know when the forex market opens and closes as well as
                            the four main trading sessions. The Forex Market Time Zone Converter displays which trading
                            session(s) is open in your current local time.
                        </p>
                        <p className={clsx(style.infoItemTitle, montserrat.className, style.textBlockMargin)}>
                            Forex Trading Sessions
                        </p>
                        <p className={clsx(style.text, style.textMargin)}>
                            {
                                `Just because you can trade the market any time of the day or night doesn't necessarily mean
                                that you should. The best time to trade is when the market is active with lots of forex
                                traders opening and closing positions, which creates a large volume of trades. The forex
                                market can be broken up into four major trading sessions: the Sydney session, the Tokyo
                                session, the London session, and the New York session.`
                            }
                        </p>
                    </div>

                    <img src="/png/marketHours/src0.png"
                         alt=""
                         className={clsx(style.infoItem, style.img)}
                    />

                    <div className={style.infoItem}>
                        <p className={clsx(style.infoItemTitle, montserrat.className)}>
                            Forex Trading Volume
                        </p>
                        <p className={clsx(style.text, style.textMargin)}>
                            {
                                `You can make money trading when the market moves up, and you can even make money when the
                            market moves down. But you will have a very difficult time trying to make money when the
                            market doesn't move at all. In order for the market to move, lots of trades need to occur.
                            And this is why you should focus your energy during specific trading sessions. The forex
                            trading sessions are named after major financial centers and are loosely based on the local
                            “work day” of traders working in those cities. The more traders…trading, the higher the
                            trading volume, and the more active the market. The more active the market, the tighter the
                            spreads you'll get and the less slippage you'll experience. In a nutshell, you'll get better
                            order execution.`
                            }
                        </p>
                    </div>

                    <img src="/png/marketHours/src1.png"
                         alt=""
                         className={clsx(style.infoItem, style.img)}
                    />

                    <div className={style.infoItem}>
                        <p className={clsx(style.infoItemTitle, montserrat.className)}>
                            When is the best time to trade forex?
                        </p>
                        <p className={clsx(style.text, style.textMargin)}>
                            {
                                `During the weekdays, there’s always at least one forex trading session open although there are periods of downtime when the market is really quiet and trading volume is low or “thin”.`
                            }
                        </p>
                        <p className={style.text}>
                            {
                                `You usually want to avoid trading when only one trading session is open and instead, wait for trading sessions to overlap.
When two major financial centers are open, the number of traders actively buying and selling a given currency greatly increases.
The highest trading volume occurs during the overlap of the London and New York trading sessions. More than 50% of trading volume occurs at these two financial centers.`
                            }
                        </p>
                    </div>

                    <img src="/png/marketHours/src2.png"
                         alt=""
                         className={clsx(style.infoItem, style.img)}
                    />

                    <div className={style.infoItem}>
                        <p className={style.text}>
                            The best time for you to trade forex will depend on which currency pair you’re looking to
                            trade.
                        </p>
                        <p className={style.text}>
                            Most of the trading activity for a specific currency pair will occur when the trading
                            sessions
                            of the individual currencies overlap.
                        </p>
                        <p className={style.text}>
                            For example, AUD/JPY will experience a higher trading volume when both Sydney and Tokyo
                            sessions
                            are open. And EUR/USD will experience a higher trading volume when both London and New York
                            sessions are open.
                        </p>

                        <p className={clsx(style.infoItemTitle, montserrat.className, style.textBlockMargin)}>
                            How to Trade with the Forex Market Time Zone Converter
                        </p>

                        <p className={clsx(style.text, style.textMargin)}>
                            Here are some tips for using the Forex Market Time Zone Converter:
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            Concentrate your trading activity during the trading hours for the three busiest trading
                            sessions: Tokyo, London, and New York.
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            Most market activity will occur when one of these three markets open.
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            The most active times will occur when two or more trading sessions overlap and are open at
                            the same time.
                        </p>

                        <p className={clsx(style.infoItemTitle, montserrat.className, style.textBlockMargin)}>
                            Frequently Asked Questions about Forex Market Hours
                        </p>

                        <p className={clsx(style.infoItemSubTitle, montserrat.className, style.textMargin)}>
                            What are the forex market hours?
                        </p>
                        <p className={clsx(style.text, style.smallMargin)}>
                            The forex market technically never closes, but retail traders can only trade the hours
                            between Sunday at 5:00 pm ET and Friday at 5:00 pm ET.
                        </p>

                        <p className={clsx(style.infoItemSubTitle, montserrat.className, style.textMargin)}>
                            What time does the forex market open?
                        </p>
                        <p className={clsx(style.text, style.smallMargin)}>
                            The forex market opens on Sunday at 5:00 pm ET.
                        </p>

                        <p className={clsx(style.infoItemSubTitle, montserrat.className, style.textMargin)}>
                            What time does the forex market close?
                        </p>
                        <p className={clsx(style.text, style.smallMargin)}>
                            The forex market closed on Friday at 5:00 pm ET.
                        </p>

                        <p className={clsx(style.infoItemSubTitle, montserrat.className, style.textMargin)}>
                            What are the forex market sessions?
                        </p>
                        <p className={clsx(style.text, style.smallMargin)}>
                            There are four trading sessions in the forex market:
                        </p>

                        <p className={clsx(style.text, style.li)}>
                            Sydney is open from 9:00 pm to 6:00 am UTC
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            Tokyo is open from 12:00 am to 9:00 am UTC
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            London is open from 7:00 am to 4:00 pm UTC
                        </p>
                        <p className={clsx(style.text, style.li)}>
                            New York is open from 1:00 pm to 10:00 pm UTC
                        </p>

                    </div>

                </div>


            </div>
        </div>
    )
})