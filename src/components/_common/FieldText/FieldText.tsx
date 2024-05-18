import {DetailedHTMLProps, FC, InputHTMLAttributes} from "react";
import style from "./FieldText.module.scss";
import {clsx} from "clsx";
import {useField} from "formik";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";

interface IFieldCustom extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    name: string
    className?: string
    background?: boolean
}

export const FieldText: FC<IFieldCustom> = observer(({
                                                name,
                                                className,
                                                background = true,
                                                ...props
                                            }) => {
    const {appStore: {lang}} = useStore();

    const [field, meta, helpers] = useField(name);

    return (
        <div className={clsx({
            [style.fieldText]: true,
            [style.fieldText_background]: background,
        }, Boolean(className) && className)}>
            <input {...props}
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