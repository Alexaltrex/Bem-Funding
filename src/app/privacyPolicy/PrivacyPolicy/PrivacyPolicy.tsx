'use client'

import style from "./PrivacyPolicy.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {texts} from "./data";

const title = "Privacy Policy";

export const PrivacyPolicy = observer(() => {
    const {appStore: {lang}} = useStore();

    const pathname = usePathname();

    console.log(pathname)

    return (
        <div className={style.privacyPolicy}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.links}>
                    {
                        [
                            {label: "Privacy Policy", href: "/privacyPolicy"},
                            {label: "Cookies", href: "/cookies"},
                            {label: "Terms & Conditions", href: "/termsConditions"},
                        ].map(({label, href}, key) => (
                            <Link key={key}
                                  href={href}
                                  className={clsx({
                                      [style.link]: true,
                                      [style.link_selected]: pathname === href,
                                  })}
                            >
                                <span>{translate(label, lang)}</span>
                            </Link>
                        ))
                    }
                </div>

                <div className={style.content}>
                    {
                        texts.map(({title, texts}, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <p className={clsx(style.itemTitle, montserrat.className)}>
                                    {translate(title, lang)}
                                </p>

                                <div className={style.texts}>
                                    {
                                        texts.map((text, key) => (
                                            <p key={key}
                                               className={style.text}
                                            >
                                                {translate(text, lang)}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
})