'use client'

import style from "./CookiesPopup.module.scss"
import {clsx} from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {FC, useEffect, useState} from "react";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import {svgIcons} from "../../../assets/svgIcons";

export const CookiesPopup = observer(() => {
    const {
        appStore: {
            lang,
        }
    } = useStore();

    const [necessary, setNecessary] = useState(true);
    const [preferencies, setPreferencies] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [marketing, setMarketing] = useState(false);


    const [value, setValue] = useState<null | string>(null)
    useEffect(() => {
        const value = localStorage.getItem("bem-funding-cookies-accept") || "";
        setValue(value === "true" ? value : "false");
    }, [])

    const onClick = () => {
        localStorage.setItem("bem-funding-cookies-accept", "true");
        setValue("true");
    };

    return (
        <>
            {
                value && value !== "true" &&
                (
                    <div className={style.cookiesPopup}>

                        <div className={style.top}>

                            <div className={style.topLeft}>
                                {svgIcons.logo}
                                <p className={style.titleMobile}>
                                    {translate("We use cookies to make our system dynamic and you can see our cookies policy here.", lang)}
                                </p>
                            </div>

                            <div className={style.topRight}>
                                <p className={style.titleTabletAndMore}>
                                    {translate("We use cookies to make our system dynamic and you can see our cookies policy here.", lang)}
                                </p>

                                <div className={style.switches}>
                                    {
                                        [
                                            {
                                                label: translate("Necessary", lang),
                                                checked: necessary,
                                                onClick: () => setNecessary(!necessary),
                                                nonChangeable: true,
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
                            </div>
                        </div>

                        <div className={style.buttons}>
                            {
                                [
                                    {
                                        label: "Allow all",
                                        variant: ButtonVariant.blue,
                                        onClick,
                                    },
                                    {
                                        label: "Allow selection",
                                        variant: ButtonVariant.outlined,
                                        onClick,
                                    },
                                    {
                                        label: "Deny",
                                        variant: ButtonVariant.outlined,
                                        onClick,
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
                )
            }
        </>

    )
})

//========= SwitchComponent =========//
interface ISwitchComponent {
    label: string
    checked: boolean
    onClick: () => void
    className?: string
    nonChangeable?: boolean
}

export const SwitchComponent: FC<ISwitchComponent> = ({
                                                          label,
                                                          checked,
                                                          onClick,
                                                          className,
                                                          nonChangeable = false
                                                      }) => {
    return (
        <div className={clsx(style.switchComponent, Boolean(className) && className)}
             onClick={() => {
                if (!nonChangeable) {
                    onClick();
                }
             }}
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