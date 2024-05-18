import {DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes} from "react";
import style from "./FieldTextarea.module.scss";
import {clsx} from "clsx";
import {useField} from "formik";
import {useStore} from "../../../store/useStore";
import {observer} from "mobx-react-lite";
import {translate} from "../../../const/lang";

interface IFieldCustom extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    name: string
    className?: string
    background?: boolean
}

export const FieldTextarea: FC<IFieldCustom> = observer(({
                                                name,
                                                className,
                                                background = true,
                                                ...props
                                            }) => {
    const {appStore: {lang}} = useStore();

    const [field, meta, helpers] = useField(name);


    return (
        <div className={clsx({
            [style.fieldTextarea]: true,
            [style.fieldTextarea_background]: background,
        }, Boolean(className) && className)}>
            <textarea {...props}
                   name={field.name}
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
            />

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