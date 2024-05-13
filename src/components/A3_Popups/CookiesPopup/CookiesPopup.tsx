'use client'

import style from "./CookiesPopup.module.scss"
import {clsx} from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";
import {FC, useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";

export const CookiesPopup = observer(() => {
    const {
        appStore: {
            lang,
            cookiesPopup, setCookiesPopup
        }
    } = useStore();

    const [necessary, setNecessary] = useState(false);
    const [preferencies, setPreferencies] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
        <div className={clsx({
            [style.cookiesPopup]: true,
            [style.cookiesPopup_hide]: !cookiesPopup,
        })}>
            <p className={clsx(montserrat.className, style.title)}>
                {translate("We use cookies", lang)}
            </p>

            <p className={style.description}>
                {translate(
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    lang
                )}
            </p>

            <div className={style.control}>
                <div className={style.switches}>
                    {
                        [
                            {
                                label: translate("Necessary", lang),
                                checked: necessary,
                                onClick: () => setNecessary(!necessary),
                            },
                            {
                                label: translate("Preferencies", lang),
                                checked: preferencies,
                                onClick: () => setPreferencies(!preferencies),
                            },
                            {
                                label: translate("Statistics", lang),
                                checked: statistics,
                                onClick: () => setStatistics(!statistics),
                            },
                            {
                                label: translate("Marketing", lang),
                                checked: marketing,
                                onClick: () => setMarketing(!marketing),
                            },
                        ].map((item, key) => (
                            <SwitchComponent key={key}
                                             className={style.switchItem}
                                             {...item}
                            />
                        ))
                    }
                </div>

                <div className={style.buttons}>
                    {
                        [
                            {
                                label: "Deny",
                                variant: ButtonVariant.outlined,
                                onClick: () => setCookiesPopup(false),
                            },
                            {
                                label: "Allow selection",
                                variant: ButtonVariant.outlined,
                                onClick: () => setCookiesPopup(false),
                            },
                            {
                                label: "Allow all",
                                variant: ButtonVariant.blue,
                                onClick: () => setCookiesPopup(false),
                            },
                        ].map(({label, variant, onClick}, key) => (
                            <ButtonCustom key={key}
                                          label={translate(label, lang)}
                                          variant={variant}
                                          className={style.btn}
                                          onClick={onClick}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
})

//========= SwitchComponent =========//
interface ISwitchComponent {
    label: string
    checked: boolean
    onClick: () => void
    className?: string
}

export const SwitchComponent: FC<ISwitchComponent> = ({
                                                          label,
                                                          checked,
                                                          onClick,
                                                          className
                                                      }) => {
    return (
        <div className={clsx(style.switchComponent, Boolean(className) && className)}
             onClick={() => onClick()}
        >
            <p className={style.label}>
                {label}
            </p>

            <div className={style.switch}>
                <div className={clsx({
                    [style.inner]: true,
                    [style.inner_checked]: checked,
                })}/>
            </div>
        </div>
    )
}