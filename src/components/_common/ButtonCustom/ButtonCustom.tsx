'use client'

import {FC} from "react";
import style from "./ButtonCustom.module.scss";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";

export enum ButtonVariant {
    outlined = 'outlined',
    contained = 'contained',
    blue = 'blue'
}

interface IButtonCustom {
    label: string
    href?: string
    variant?: ButtonVariant
    onClick?: () => void
    className?: string
}

export const ButtonCustom: FC<IButtonCustom> = ({
                                                    label,
                                                    href,
                                                    variant = ButtonVariant.outlined,
                                                    onClick,
                                                    className
                                                }) => {
    return (
        <>
            {
                href ? (
                    <a href={href}
                       className={clsx({
                           [style.buttonCustom]: true,
                           [style.buttonCustom_outlined]: variant === ButtonVariant.outlined,
                           [style.buttonCustom_contained]: variant === ButtonVariant.contained,
                           [style.buttonCustom_blue]: variant === ButtonVariant.blue,
                       }, Boolean(className) && className)}
                       target="_blank"
                       rel="nofollow noopener noreferrer"
                    >
                        <span className={montserrat.className}>{label}</span>
                    </a>
                ) : (
                    <button className={clsx({
                        [style.buttonCustom]: true,
                        [style.buttonCustom_outlined]: variant === ButtonVariant.outlined,
                        [style.buttonCustom_contained]: variant === ButtonVariant.contained,
                        [style.buttonCustom_blue]: variant === ButtonVariant.blue,

                    }, Boolean(className) && className)}
                            onClick={() => {
                                onClick && onClick()
                            }}
                    >
                        <span className={montserrat.className}>{label}</span>
                    </button>
                )
            }
        </>
    )
}