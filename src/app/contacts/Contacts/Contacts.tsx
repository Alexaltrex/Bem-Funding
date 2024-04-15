'use client'

import style from "./Contacts.module.scss";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {svgIcons} from "../../../assets/svgIcons";
import {Form, Formik, FormikErrors, FormikProps} from "formik";
import {mailRegexp} from "../../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../../../components/_common/FieldText/FieldText";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {FieldTextarea} from "../../../components/_common/FieldTextarea/FieldTextarea";
import {YMaps, Map} from "@pbe/react-yandex-maps";

export interface IValues {
    fullName: string
    email: string
    contactNumber: string
    coverLetter: string
}

const initialValues: IValues = {
    fullName: "",
    email: "",
    contactNumber: "",
    coverLetter: "",
}

const validate = ({fullName, email, contactNumber, coverLetter}: IValues): FormikErrors<IValues> => {
    const errors: FormikErrors<IValues> = {};
    if (!fullName) {
        errors.fullName = "Required"
    }
    if (!mailRegexp.test(email)) {
        errors.email = "Invalid Email"
    }
    if (!email) {
        errors.email = "Email required"
    }
    if (!contactNumber) {
        errors.contactNumber = "Required"
    }
    return errors
}


export const Contacts = () => {

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            console.log(values);

        } catch (e) {
            console.log(e)
        } finally {
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.contacts}>
            <div className={style.inner}>

                <h2 className={clsx(style.h2, montserrat.className)}>
                    Contacts
                </h2>

                <div className={style.content}>

                    <div className={style.top}>

                        <div className={style.contactsData}>
                            {
                                [
                                    {
                                        icon: svgIcons.marker_pin,
                                        text: "Kurşunlu,35, 42430, Sarayönü/Istanbul, Turkey",
                                    },
                                    {
                                        icon: svgIcons.phone_call,
                                        text: "+971 58 543 6008",
                                    },
                                    {
                                        icon: svgIcons.marker_pin,
                                        text: "contact@bemfunding.com",
                                    },
                                ].map(({icon, text}, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        {icon}
                                        <p className={clsx(style.text, montserrat.className)}>
                                            {text}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.mapWrapper}>
                            <YMaps>
                                    <Map state={{
                                        center: [40.706902352897515,-73.97974500000001],
                                        zoom: 9,
                                        controls: [
                                            //'zoomControl',
                                            //'fullscreenControl',
                                        ],
                                    }}
                                         style={{
                                             width: "100%",
                                             height: "100%"
                                         }}
                                    />
                            </YMaps>
                            {/*<img src="/jpeg/contacts/map.jpg" alt=""/>*/}
                        </div>

                    </div>

                    <div className={style.formWrapper}>
                        <p className={style.formTitle}>
                            Any question?
                        </p>

                        <Formik initialValues={initialValues}
                                onSubmit={onSubmit}
                                validate={validate}

                        >
                            {(props: FormikProps<IValues>) => (
                                <Form autoComplete="off"
                                      className={style.form}
                                >

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            Full name <span>*</span>
                                        </p>
                                        <FieldText name="fullName" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            Email <span>*</span>
                                        </p>
                                        <FieldText name="email" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            Contact number <span>*</span>
                                        </p>
                                        <FieldText name="contactNumber" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            Cover letter
                                        </p>
                                        <FieldTextarea name="coverLetter" className={clsx(style.field, style.textarea)}/>
                                    </div>

                                    {/*@ts-ignore*/}
                                    <ButtonCustom type="submit"
                                                  disabled={props.isSubmitting}
                                                  label="Submit"
                                                  variant={ButtonVariant.blue}
                                                  className={style.submitBtn}
                                    />


                                </Form>
                            )}
                        </Formik>
                    </div>


                </div>

            </div>
        </div>
    )
}
