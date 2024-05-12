"use client"

import {observer} from "mobx-react-lite";
import style from "./Discover.module.scss"
import {translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {svgIcons} from "../../../assets/svgIcons";

const pre = "TRADING PLATFORMS"

const title = "Discover The BEM Funding Trading Platform";

const texts = [
    "Proudly unveiling the BEM Funding Trading App and Platform, meticulously crafted for traders of all expertise levels and trading styles. Stay connected on the go with our intuitive Mobile App, available from the official launch on Apple's App Store and Google Play Store. Prefer the big screen? Dive into our advanced Web App.",
    "The BEM Funding Trading App and Platform raises the bar with user-friendliness and intuitive design. Enjoy direct feeds from top data feed providers, super-raw spreads, low commissions, no markup, all within a demo environment that's as true-to-life as the stars. Your upgraded trading experience is just a click away. Explore our Mobile and Web Apps and see the difference firsthand.",
]

const label = "Now Available On"

const buttonLabel = "Web Trading Platform";

export const Discover = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.discover}>
            <div className={style.inner}>

                <div className={style.imgWrapper}>
                    <img src="/png/main_page/discover_cloud.png"
                         alt=""
                         className={style.cloud}
                    />
                    <img src="/png/main_page/discover_mobile.png"
                         alt=""
                         className={style.mobile}
                    />
                </div>

                <div className={style.content}>

                    <p className={style.pre}>
                        {translate(pre, lang)}
                    </p>

                    <h2 className={style.title}>
                        <span className={montserrat.className}>{title}</span>
                    </h2>

                    <div className={style.texts}>
                        {
                            texts.map((text, key) => (
                                <p key={key}>
                                    {text}
                                </p>
                            ))
                        }
                    </div>

                    <p className={clsx(style.label, montserrat.className)}>
                        {translate(label, lang)}
                    </p>

                    <div className={style.buttonsWrapper}>

                        <div className={style.links}>
                            {
                                [
                                    {
                                        icon: svgIcons.appStore,
                                        href: "#"
                                    },
                                    {
                                        icon: svgIcons.googlePlay,
                                        href: "#"
                                    },
                                ].map(({href, icon}, key) => (
                                    <a key={key}
                                       href={href}
                                       target="_blank"
                                       rel="nofollow noopener noreferrer"
                                    >
                                        {icon}
                                    </a>
                                ))
                            }
                        </div>

                        <ButtonCustom label={translate(buttonLabel, lang)}
                                      variant={ButtonVariant.blue}
                                      className={style.btn}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
})