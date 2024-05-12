'use client'

import style from "./Footer.module.scss";
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import {outerLinkOptions, socialLinks} from "../../const/socialLinks";
import {ISubLink, links} from "../../const/links";
import {useStore} from "../../store/useStore";
import {observer} from "mobx-react-lite";
import {translate} from "../../const/lang";

const footerLinks = [
    // @ts-ignore
    ...links[0].subLinks,
    links[1],
    // @ts-ignore
    ...links[2].subLinks,
    {
        label: "Privacy Policy",
        href: "/privacyPolicy",
    },
    {
        label: "Terms & Conditions",
        href: "/privacyPolicy",
    },
    {
        label: "Cookies Policy",
        href: "/privacyPolicy",
    },

] as ISubLink[]

const text = "All information provided on this site is intended solely for the study purposes related to trading on financial markets and does not serve in any way as a specific investment recommendation, business recommendation, investment opportunity analysis or similar general recommendation regarding the trading of investment instruments."


export const Footer = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <footer className={style.footer}>

            <div className={style.inner}>

                <div className={style.top}>

                    <div className={style.topFirst}>

                        <Link href="/"
                              className={style.logo}
                        >
                            {svgIcons.logo}
                        </Link>

                        <div className={style.socialsLinksTabletAndMore}>
                            {
                                socialLinks.map(({icon, href}, key) => (
                                    <a key={key}
                                       href={href}
                                       className={style.socialsLinks_link}
                                       {...outerLinkOptions}

                                    >
                                        {icon}
                                    </a>
                                ))
                            }
                        </div>

                    </div>

                    <div className={style.topSecond}>

                        <div className={style.linksMobile}>
                            {
                                [
                                    footerLinks.slice(0, 6),
                                    footerLinks.slice(6, 13),
                                ].map((column, key) => (
                                    <div key={key}
                                         className={style.column}
                                    >
                                        {
                                            column.map(({label, href}, index) => (
                                                <Link key={index}
                                                      href={href}
                                                      className={style.link}
                                                >
                                                    {translate(label, lang)}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.linksTabletAndMore}>
                            {
                                [
                                    footerLinks.slice(0, 3),
                                    footerLinks.slice(3, 6),
                                    footerLinks.slice(6, 10),
                                    footerLinks.slice(10, 13),
                                ].map((column, key) => (
                                    <div key={key}
                                         className={style.column}
                                    >
                                        {
                                            column.map(({label, href}, index) => (
                                                <Link key={index}
                                                      href={href}
                                                      className={style.link}
                                                >
                                                    {translate(label, lang)}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.socialsLinksMobile}>
                            {
                                socialLinks.map(({icon, href}, key) => (
                                    <a key={key}
                                       href={href}
                                       className={style.socialsLinks_link}
                                       {...outerLinkOptions}

                                    >
                                        {icon}
                                    </a>
                                ))
                            }
                        </div>

                        <p className={style.rightsMobile}>
                            © 2024 BEM Funding
                        </p>

                    </div>

                </div>

                <div className={style.bottom}>
                    <p className={style.rights}>
                        © 2024 BEM Funding
                    </p>

                    <div className={style.descriptionWrapper}>
                        <p className={style.description}>
                            {translate(text, lang)}
                        </p>

                        <button className={style.btn}>
                            {svgIcons.arrow_down}
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    )
})