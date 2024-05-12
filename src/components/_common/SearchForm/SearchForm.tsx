'use client'

import {svgIcons} from "../../../assets/svgIcons";
import style from "./SearchForm.module.scss"
import {FormikHelpers} from "formik/dist/types";
import {useFormik} from "formik";
import {FC} from "react";
import {clsx} from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";

export interface IValues {
    value: string
}

const initialValues = {
    value: ""
}

export interface ISearchForm {
    className?: string
    onSearch: (values: IValues) => Promise<void>
    onClear: () => void
}

//========= SEARCH FORM =========//
export const SearchForm: FC<ISearchForm> = observer(({
                                                className,
                                                onSearch,
                                                onClear,
                                            }) => {
    const {appStore: {lang}} = useStore();

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            if (values.value) {
                console.log(values);
                await onSearch(values);
            }
        } catch (e) {
            console.log(e)
        } finally {

        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}
              className={clsx(style.searchForm, Boolean(className) && className)}
        >

            <input name="value"
                   placeholder={translate("Write here...", lang)}
                   value={formik.values.value}
                   onBlur={formik.handleBlur}
                   onChange={(e) => {
                       formik.handleChange(e);
                       setTimeout(() => {
                           formik.submitForm();
                       }, 0)
                   }}
            />

            <button onClick={() => {
                if (formik.values.value) {
                    onClear();
                    formik.resetForm();
                }
            }}
            >
                {
                    formik.values.value ? svgIcons.close_gradient : svgIcons.search
                }
            </button>

        </form>
    )
})