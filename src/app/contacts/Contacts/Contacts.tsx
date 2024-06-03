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
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {useStore} from "../../../store/useStore";
import {observer} from "mobx-react-lite";
import {translate} from "../../../const/lang";
import {useRef, useState} from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {useMediaQuery} from "@mui/material";

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
    // if (!contactNumber) {
    //     errors.contactNumber = "Required"
    // }
    return errors
}

//========= CONTACTS =========//
export const Contacts = observer(() => {
    const {appStore: {lang, setMailAlert}} = useStore();

    const [sending, setSending] = useState(false)

    const matchesTabletAndMore = useMediaQuery('(min-width:768px)');

    // recapture
    const recaptchaRef = useRef();

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            const recaptchaValue = recaptchaRef.current.getValue();
            if (recaptchaValue) {
                console.log(values);
                setSending(true);
                const response = await axios.post("/api/contacts", values);
                setMailAlert({open: true, message: "The mail is successfully delivered", severity: "success"})
                console.log(response);
            }
        } catch (e: any) {
            console.log(e.message)
            setMailAlert({open: true, message: `Error: ${e.message}`, severity: "error"})
        } finally {
            formikHelpers.resetForm();
            setSending(false);
            recaptchaRef.current.reset();
        }
    };

    return (
        <div className={style.contacts}>
            <div className={style.inner}>

                <h2 className={clsx(style.h2, montserrat.className)}>
                    {translate("Contacts", lang)}
                </h2>

                <div className={style.content}>

                    <div className={style.top}>

                        <div className={style.contactsData}>
                            {
                                [
                                    {
                                        icon: svgIcons.marker_pin,
                                        text: "The Meydan Hotel, Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E",
                                    },
                                    // {
                                    //     icon: svgIcons.phone_call,
                                    //     text: "+971 58 543 6008",
                                    // },
                                    {
                                        icon: svgIcons.mail,
                                        text: "company@bemfunding.com",
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
                                    center: [25.155664459072018, 55.30028825917784],
                                    zoom: 14,
                                    controls: [],
                                }}
                                     style={{
                                         width: "100%",
                                         height: "100%"
                                     }}
                                >
                                    <Placemark modules={['geoObject.addon.hint']}
                                               geometry={[25.155664459072018, 55.30028825917784]}
                                    />
                                </Map>
                            </YMaps>
                        </div>

                    </div>

                    <div className={style.formWrapper}>
                        <p className={style.formTitle}>
                            {translate("Any question?", lang)}
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
                                            {translate("Full name", lang)}<span>*</span>
                                        </p>
                                        <FieldText name="fullName" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            Email<span>*</span>
                                        </p>
                                        <FieldText name="email" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            {translate("Contact number", lang)}
                                        </p>
                                        <FieldText name="contactNumber" className={style.field}/>
                                    </div>

                                    <div className={style.fieldRow}>
                                        <p className={style.fieldRowLabel}>
                                            {translate("Message", lang)}
                                        </p>
                                        <FieldTextarea name="coverLetter"
                                                       className={clsx(style.field, style.textarea)}/>
                                    </div>

                                    <div className={style.recaptureWrapper}>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            size={matchesTabletAndMore ? "normal" : "compact"}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                        />
                                    </div>

                                    {/*@ts-ignore*/}
                                    <ButtonCustom type="submit"
                                                  disabled={props.isSubmitting || sending}
                                                  label={sending ? translate("Submit", lang) + "..." : translate("Submit", lang)}
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
})
