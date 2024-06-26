'use client'

import style from "./Header.module.scss";
import Link from "next/link";
import {svgIcons} from "../../assets/svgIcons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {ButtonCustom} from "../_common/ButtonCustom/ButtonCustom";
import {LangSwitcher} from "./LangSwitcher/LangSwitcher";
import {LangEnum, translate} from "../../const/lang";
import {ISubLink, links} from "../../const/links";
import {FC, Fragment, useRef, useState} from "react";
import {clsx} from "clsx";
import {montserrat} from "../../assets/fonts/fonts";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export const Header = observer(() => {
    const {
        appStore: {
            burgerMenu, setBurgerMenu, lang
        }
    } = useStore();

    return (
            <header className={style.header}>
                <div className={style.inner}>

                    <Link href="/" className={style.logo}>
                        {svgIcons.logo}
                    </Link>

                    <div className={style.links}>
                        {
                            links.map(({label, href, subLinks}, key) => (
                                <Fragment key={key}>
                                    {
                                        href ? (
                                            <Link href={href}
                                                  className={clsx(style.link, montserrat.className)}
                                            >
                                                {translate(label, lang)}
                                            </Link>
                                        ) : (
                                            <DropDown title={label}
                                                      subLinks={subLinks as ISubLink[]}
                                                      lang={lang}
                                            />
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </div>

                    <div className={style.right}>

                        <ButtonCustom label={translate('Trading Space', lang)}
                                      className={style.tradingBtn}
                        />

                        <LangSwitcher/>

                        <button className={style.burgerBtn}
                                onClick={() => setBurgerMenu(!burgerMenu)}
                        >
                            {burgerMenu ? svgIcons.close : svgIcons.burger}
                        </button>
                    </div>
                </div>
            </header>
    )
})

//========= DROP DOWN =========//
interface IDropDown {
    title: string
    subLinks: ISubLink[]
    lang: LangEnum
}

const DropDown: FC<IDropDown> = ({
                                     title,
                                     subLinks,
    lang
                                 }) => {
    const [open, setOpen] = useState(false);

    const onMouseEnter = () => setOpen(true)
    const onMouseLeave = () => setOpen(false)

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(".modal", {
            scale: open ? 1 : 0.8,
            opacity: open ? 1 : 0,
            display: open ? "block" : "none",
            duration: 0.3,
        });

    }, {dependencies: [open], scope: appRef});

    return (
        <div className={clsx({
            [style.dropDown]: true,
            [style.dropDown_open]: open,
        })}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             ref={appRef}

        >
            <div className={style.titleWrapper}>
                <p className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </p>
                {svgIcons.arrow_down}
            </div>

            <div className={clsx(style.dropDownModal, "modal")}>
                <div className={style.dropDownModal_inner}>
                    {
                        subLinks.map(({label, href}, key) => (
                            <Link key={key}
                                  href={href}
                                  className={style.sublink}
                            >
                                {translate(label, lang)}
                            </Link>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}