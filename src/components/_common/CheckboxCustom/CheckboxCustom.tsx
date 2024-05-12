'use client'

import {FC} from "react";
import {clsx} from "clsx";
import style from "./CheckboxCustom.module.scss"
import {svgIcons} from "../../../assets/svgIcons";

interface ICheckboxCustom {
    className?: string
    checked: boolean
    onClick: () => void
}

export const CheckboxCustom: FC<ICheckboxCustom> = ({
                                                        className,
                                                        checked,
                                                        onClick,
                                                    }) => {
    return (
        <button className={clsx({
            [style.checkboxCustom]: true,
            [style.checkboxCustom_checked]: checked,
        }, Boolean(className) && className)}
                onClick={() => onClick()}
        >
            {svgIcons.check}
        </button>
    )
}