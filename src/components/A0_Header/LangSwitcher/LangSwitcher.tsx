'use client'

import style from "./LangSwitcher.module.scss"
import {observer} from "mobx-react-lite";
import {svgIcons} from "../../../assets/svgIcons";
import {montserrat} from "../../../assets/fonts/fonts";
import {useStore} from "../../../store/useStore";
import {LangEnum} from "../../../const/lang";
import {clsx} from "clsx";

export const LangSwitcher = observer(() => {
    const {
        appStore: {
            lang, setLang,
        }
    } = useStore()

    return (
        <button className={style.langSwitcher}
                onClick={() => setLang(lang === LangEnum.ENG ? LangEnum.TUR : LangEnum.ENG)}
        >
            <div className={clsx({
                [style.inner]: true,
                [style.inner_tur]: lang === LangEnum.TUR,
            })}>
                {
                    [
                        {
                            svg: svgIcons.flag_eng,
                            label: "ENG"
                        },
                        {
                            svg: svgIcons.flag_tur,
                            label: "TUR"
                        },
                    ].map(({svg, label}, key) => (
                        <div key={key}
                             className={style.item}
                        >
                            {svg}
                            <span className={montserrat.className}>
                            {label}
                        </span>
                        </div>
                    ))
                }
            </div>
        </button>
    )
})