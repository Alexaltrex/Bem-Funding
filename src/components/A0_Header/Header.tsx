'use client'

import style from "./Header.module.scss";
import Link from "next/link";
import {svgIcons} from "../../assets/svgIcons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {ButtonCustom} from "../_common/ButtonCustom/ButtonCustom";
import {LangSwitcher} from "./LangSwitcher/LangSwitcher";

export const Header = observer(() => {
    const {
        appStore: {
            burgerMenu, setBurgerMenu
        }
    } = useStore();

    return (
        <header className={style.header}>
            <header className={style.inner}>

                <Link href="/" className={style.logo}>
                    {svgIcons.logo}
                </Link>

                <div className={style.right}>

                    <ButtonCustom label='Trading Space'
                                  className={style.tradingBtn}
                    />

                    <LangSwitcher/>

                    <button className={style.burgerBtn}
                            onClick={() => setBurgerMenu(!burgerMenu)}
                    >
                        {burgerMenu ? svgIcons.close : svgIcons.burger}
                    </button>
                </div>
            </header>
        </header>
    )
})