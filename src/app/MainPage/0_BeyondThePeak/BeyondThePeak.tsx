'use client'

import {observer} from "mobx-react-lite";
import style from "./BeyondThePeak.module.scss"
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {socialLinks} from "../../../const/socialLinks";
import {CloudComponent} from "../../../components/_common/Cloud/Cloud";

const pre = 'For Traders By Traders'
const titles = [
    "Beyond the Peak",
    "Lies Your Potential",
]
const descriptions = [
    `Here at BEM Funding you can train risk-free and qualify to manage up to $200,000 on a BEM Account. Prove your skill and keep up to 90% of the profits from your simulated trades.`,
    `Join us, and transform your summit lessons into real-world victories`
]
const joinLabel = "Join Our Community";

export const BeyondThePeak = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.beyondThePeak}>

            <div className={style.cloudMainWrapper}>
                {
                    [0, 1, 2, 3, 4].map((key) => (
                        <div key={key} className={style.cloudWrapper}>
                            <CloudComponent seed={key} speed={0.5}/>
                        </div>
                    ))
                }

            </div>

            <div className={style.inner}>

                <p className={style.pre}>
                    {translate(pre, lang)}
                </p>

                <h1 className={clsx(style.title, montserrat.className)}>
                    <p>
                        {translate(titles[0], lang)}
                    </p>
                    <p>
                        {translate(titles[1], lang)}
                    </p>
                </h1>

                <div className={style.descriptions}>
                    {
                        descriptions.map((text, key) => (
                            <p key={key}
                               className={style.description}
                            >
                                {translate(text, lang)}
                            </p>
                        ))
                    }
                </div>


                <div className={style.btns}>
                    <ButtonCustom label={translate("Get Started", lang)}
                                  variant={ButtonVariant.blue}
                                  className={style.btn}
                    />
                    {/*<ButtonCustom label={translate("Join Our Discord", lang)}*/}
                    {/*              variant={ButtonVariant.contained}*/}
                    {/*              className={style.btn}*/}
                    {/*/>*/}
                </div>

                <p className={clsx(style.join, montserrat.className)}>
                    {translate(joinLabel, lang)}
                </p>

                <div className={style.socialLinks}>
                    {
                        socialLinks.map(({icon, href}, key) => (
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

            </div>
        </div>
    )
})