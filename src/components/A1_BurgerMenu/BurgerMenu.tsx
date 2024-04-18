'use client'

import style from "./BurgerMenu.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {clsx} from "clsx";
import {ISubLink, links} from "../../const/links";
import {FC, useRef, useState} from "react";
import Link from "next/link";
import {montserrat} from "../../assets/fonts/fonts";
import {svgIcons} from "../../assets/svgIcons";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export const BurgerMenu = observer(() => {
    const {
        appStore: {
            burgerMenu, setBurgerMenu, lang
        }
    } = useStore();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_open]: burgerMenu,
        })}>
            {
                links.map(({title, href, subLinks}, key) => (
                    <div key={key}
                         className={style.item}
                    >
                        {
                            href ? (
                                <Link href={href}
                                      className={clsx(style.link, montserrat.className)}
                                      onClick={() => setBurgerMenu(false)}
                                >
                                    {title}
                                </Link>
                            ) : (
                                <DropDown title={title}
                                          subLinks={subLinks as ISubLink[]}
                                          onLinkClick={() => setBurgerMenu(false)}
                                />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
})

//========= DROP DOWN =========//
interface IDropDown {
    title: string
    subLinks: ISubLink[]
    onLinkClick: () => void
}

const DropDown: FC<IDropDown> = ({
                                     title,
                                     subLinks,
                                     onLinkClick
                                 }) => {
    const [open, setOpen] = useState(false);

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(".list", {
            scale: open ? 1 : 0.8,
            opacity: open ? 1 : 0,
            display: open ? "flex" : "none",
            duration: 0.3,
        });
    }, {dependencies: [open], scope: appRef});

    return (
        <div className={clsx({
            [style.dropDown]: true,
            [style.dropDown_open]: open,
        })}
             ref={appRef}
        >
            <div className={style.titleWrapper}
                 onClick={() => setOpen(!open)}
            >
                <p className={clsx(style.title, montserrat.className)}>
                    {title}
                </p>
                {svgIcons.arrow_down}
            </div>

            <div className={clsx(style.list, "list")}>
                {
                    subLinks.map(({label, href}, key) => (
                        <Link key={key}
                              href={href}
                              className={style.sublink}
                              onClick={() => onLinkClick()}
                        >
                            {label}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}