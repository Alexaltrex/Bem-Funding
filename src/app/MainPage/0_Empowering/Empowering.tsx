'use client'

import {observer} from "mobx-react-lite";
import style from "./Empowering.module.scss"
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {socialLinks} from "../../../const/socialLinks";

const pre = 'OUR RISK, YOUR PROFIT'
const titles = [
    "Empowering Your",
    "Trading Ambitions",
]
const description = 'Your Journey To Trading Excellence Fueled by BEM Funding: Trade up to $400k on a Funded Star Account, Get Instant Rewards, and Earn up to 100% of the Profits.'

export const Empowering = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.empowering}>
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

                <p className={style.description}>
                    {translate(description, lang)}
                </p>

                <div className={style.btns}>
                    <ButtonCustom label={translate("Get funded", lang)}
                                  variant={ButtonVariant.blue}
                    />
                    <ButtonCustom label={translate("Join Our Discord", lang)}
                                  variant={ButtonVariant.contained}
                                  className={style.btn}
                    />
                </div>

                <p className={clsx(style.join, montserrat.className)}>
                    {
                        translate(
                            "Join Our Community",
                            lang
                        )
                    }
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