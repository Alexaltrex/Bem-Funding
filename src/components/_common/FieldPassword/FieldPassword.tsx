import {DetailedHTMLProps, FC, InputHTMLAttributes, useState} from "react";
import style from "./FieldPassword.module.scss";
import {clsx} from "clsx";
import {useField} from "formik";
import {svgIcons} from "../../../assets/svgIcons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";

interface IFieldCustom extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    name: string
    className?: string
    background?: boolean
}

export const FieldPassword: FC<IFieldCustom> = observer(({
                                                    name,
                                                    className,
                                                    background = true,
                                                    ...props
                                                }) => {
    const {appStore: {lang}} = useStore();

    const [field, meta, helpers] = useField(name);

    const [show, setShow] = useState(false);



    return (
        <div className={clsx({
            [style.fieldPassword]: true,
            [style.fieldPassword_background]: background,
            [style.fieldPassword_show]: show,
        }, Boolean(className) && className)}>

            <input {...props}
                   type={show ? "text" : "password"}
                   name={field.name}
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
            />

            <button className={clsx({
                [style.btn]: true,
                [style.btn_show]: show,
            })}
                    onClick={() => setShow(!show)}
            >
                {svgIcons.password_show}
            </button>

            {
                meta.touched && meta.error && (
                    <p className={style.error}>
                        {translate(meta.error, lang)}
                    </p>
                )
            }
        </div>
    )
})