import style from "./Footer.module.scss";
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import {outerLinkOptions, socialLinks} from "../../const/socialLinks";
import {ISubLink, links} from "../../const/links";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {clsx} from "clsx";
import {montserrat} from "../../assets/fonts/fonts";
import {Fragment} from "react";

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.inner}>

                <div className={style.top}>

                    <div className={style.logo_and_socials}>
                        <Link href="/"
                              className={style.logo}
                        >
                            {svgIcons.logo}
                        </Link>

                        <div className={style.socialsLinks}>
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

                    <div className={style.links}>
                        {
                            links.map(({title, subLinks, href}, key) => (
                                <Fragment key={key}>
                                    {
                                        href ? (
                                            <Link href={href}
                                                  className={style.title}
                                            >
                                                {title}
                                            </Link>
                                        ) : (
                                            <div key={key}
                                                 className={style.group}
                                            >
                                                <p className={clsx(style.title, montserrat.className)}>
                                                    {title}
                                                </p>
                                                <div className={style.subLinks}>
                                                    {
                                                        (subLinks as ISubLink[]).map(({label, href}, key) => (
                                                            <Link key={key}
                                                                  href={href}
                                                                  className={style.subLink}
                                                            >
                                                                {label}
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </Fragment>

                            ))
                        }

                    </div>


                </div>


                <div className={style.bottom}>
                    <p className={style.rights}>
                        © 2024 BEM Funding
                    </p>


                    <div className={style.descriptionWrapper}>
                        <p className={style.description}>
                            All information provided on this site is intended solely for the study purposes related to
                            trading on financial markets and does not serve in any way as a specific investment
                            recommendation, business recommendation, investment opportunity analysis or similar general
                            recommendation regarding the trading of investment instruments.
                        </p>

                        <button className={style.btn}>
                            {svgIcons.arrow_down}
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    )
}