'use client'

import {DetailedHTMLProps, FC, InputHTMLAttributes, useRef, useState} from "react";
import style from "./FieldCountry.module.scss"
import {clsx} from "clsx";
import {svgIcons} from "../../../assets/svgIcons";
import {useField} from "formik";
import countryList from 'react-select-country-list'
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import {useOutsideButNotOnTargetClick} from "../../../hooks/useOutsideButNotOnTargetClick";

interface IFieldCountry extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
}

export const FieldCountry:FC<IFieldCountry> = ({
                                                   className,
    ...props
                                               }) => {
    const [field, meta, helpers] = useField("country");
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null!);
    const targetRef = useRef<HTMLDivElement>(null!);

    useOutsideButNotOnTargetClick(ref, targetRef,  () => setOpen(false))

    return (
        <div className={clsx({
            [style.fieldCountryWrapper]: true,
            [style.fieldCountryWrapper_open]: open,
        }, Boolean(className) && className)}>

            <div className={style.fieldCountry}
                 onClick={() => setOpen(!open)}
                 ref={targetRef}
            >
                <p className={style.value}>{field.value}</p>

                {svgIcons.arrow_down_select}

                {
                    meta.touched && meta.error && (
                        <p className={style.error}>
                            {meta.error}
                        </p>
                    )
                }
            </div>

            <input {...props}
                   name={field.name}
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
                   style={{
                       display: "none"
                   }}
            />

            {
                open && (
                    <div className={style.list}
                         ref={ref}
                    >
                        <div className={style.listInner}>
                            {
                                countryList().getData().map(({value, label}, key) => (
                                    <button key={key}
                                            className={style.listItem}
                                            onClick={() => {
                                                setOpen(false);
                                                helpers.setValue(label);
                                            }}
                                    >
                                        <span>{label}</span>
                                    </button>
                                ))
                            }
                        </div>

                    </div>
                )
            }


        </div>

    )
}