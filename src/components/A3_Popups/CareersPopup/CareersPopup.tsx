'use client'

import style from "./CareersPopup.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {Form, Formik, FormikErrors, FormikProps} from "formik";
import {mailRegexp} from "../../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../../_common/FieldText/FieldText";
import {FieldTextarea} from "../../_common/FieldTextarea/FieldTextarea";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import Link from "next/link";
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const title = "Start Your Career Today";
const subTitle = "Please fill in your information and send it to the employer.";

export interface IValues {
    fullName: string
    email: string
    link: string
    contactNumber: string
    letter: string
}

const initialValues: IValues = {
    fullName: "",
    email: "",
    link: "",
    contactNumber: "",
    letter: "",
}

const validate = ({fullName, email, link, contactNumber, letter}: IValues): FormikErrors<IValues> => {
    const errors: FormikErrors<IValues> = {};

    if (!fullName) {
        errors.fullName = "Required"
    }

    if (!mailRegexp.test(email)) {
        errors.email = "Invalid Email"
    }
    if (!email) {
        errors.email = "Required"
    }

    // if (!link) {
    //     errors.link = "Required"
    // }

    if (!contactNumber) {
        errors.contactNumber = "Required"
    }

    if (!letter) {
        errors.letter = "Required"
    }

    return errors
};

export const CareersPopup = observer(() => {
    const {
        appStore: {
            lang,
            career, setCareer,
            setMailAlert,
        }
    } = useStore();

    const [sending, setSending] = useState(false)

    const [file, setFile] = useState<null | File>(null)

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(appRef.current, {
            scale: career ? 1 : 0.8,
            opacity: career ? 1 : 0,
            display: career ? "flex" : "none",
            duration: 0.3,
        });

    }, {dependencies: [career], scope: appRef});

    // recapture
    const recaptchaRef = useRef<ReCAPTCHA>(null!);

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue) {
            try {
                console.log(values);

                setSending(true);

                const formData = new FormData();
                Object.keys(values).forEach(key => (
                    // @ts-ignore
                    formData.append(`${key}`, values[key])
                ));

                if (file) {
                    formData.append("file", file);
                }

                formData.append("careers", career ? career.title : "");

                const response = await axios.post("/api/careers", formData);
                console.log(response)

                setMailAlert({open: true, message: "The mail is successfully delivered", severity: "success"})
            } catch (e: any) {
                console.log(e.message)
                setMailAlert({open: true, message: `Error: ${e.message}`, severity: "error"})
            } finally {
                formikHelpers.resetForm();
                recaptchaRef.current.reset();
                setSending(false);
            }
        }
    }

    const onClose = () => {
        setCareer(null);
        setFile(null);
    };

    const ref = useRef<HTMLDivElement>(null!);

    useOutsideClick(ref, () => setCareer(null))


    return (
        <div className={style.careersPopup}
             ref={appRef}
        >
            {
                career && (
                    <div className={style.card}
                         ref={ref}
                    >

                        <Formik initialValues={initialValues}
                                onSubmit={onSubmit}
                                validate={validate}
                        >
                            {(props: FormikProps<IValues>) => (
                                <Form>

                                    <button className={style.closeBtn}
                                            onClick={() => onClose()}
                                    >
                                        {svgIcons.close}
                                    </button>

                                    <p className={clsx(style.cardTitle, montserrat.className)}>
                                        {translate(title, lang)}
                                    </p>

                                    <p className={style.subTitle}>
                                        {translate(subTitle, lang)}
                                    </p>

                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                {translate("Full name", lang)}<span>*</span>
                                            </p>
                                            <FieldText name="fullName"
                                                       className={style.field}
                                            />
                                        </div>
                                    </div>

                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                Email<span>*</span>
                                            </p>
                                            <FieldText name="email"
                                                       className={style.field}
                                            />
                                        </div>
                                    </div>

                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                {translate("linkedin/github link", lang)}
                                            </p>
                                            <FieldText name="link"
                                                       className={style.field}
                                            />
                                        </div>
                                    </div>


                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                {translate("Contact number", lang)}<span>*</span>
                                            </p>
                                            <FieldText name="contactNumber"
                                                       className={style.field}
                                            />
                                        </div>
                                    </div>

                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                {translate("Message", lang)}<span>*</span>
                                            </p>
                                            <FieldTextarea name="letter"
                                                           className={clsx(style.field, style.textarea)}
                                                           placeholder={translate("Write here", lang)}
                                            />
                                        </div>
                                    </div>

                                    <div className={style.uploadWrapper}>
                                        <p className={style.label}>
                                            {translate("Resume", lang)}
                                        </p>

                                        <div className={style.right}>
                                            <label className={clsx({
                                                [style.inputWrapper]: true,
                                                [style.inputWrapper_file]: file,
                                            })}>
                                                <input type="file"
                                                       accept=".pdf"
                                                       onChange={(e) => {

                                                           if (e.target.files && (e.target.files[0].size / (1024 * 1024) < 2)) {
                                                               //console.log(e.target.files[0]);
                                                               setFile(e.target.files[0]);
                                                           }
                                                       }}
                                                />
                                                {svgIcons.file_attachment}
                                            </label>
                                            <p className={style.uploadDescription}>
                                                {translate("Upload your resume file", lang)}
                                                <span>.pdf</span> {translate("(max 2mb)", lang)}
                                            </p>

                                        </div>
                                    </div>

                                    {
                                        file && (
                                            <p className={style.filename}>
                                                {(file as File).name}
                                            </p>
                                        )
                                    }

                                    <div className={style.recaptureWrapper}>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            size="normal"
                                            sitekey="6LfvGPApAAAAALKhOOVSiSny6Ig5AMxT7ratTzyg" //{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                                        />
                                    </div>

                                    {/*@ts-ignore*/}
                                    <ButtonCustom type="submit"
                                                  disabled={props.isSubmitting || sending}
                                                  label={sending ? translate("Submit", lang) + "..." : translate("Submit", lang)}
                                                  className={style.submitBtn}
                                                  variant={ButtonVariant.blue}
                                    />

                                    <p className={style.needSupport}>
                                        {translate("Need support?", lang)} <Link href="/contacts"
                                                                                 onClick={() => onClose()}
                                    >
                                        {translate("Contact Us", lang)}
                                    </Link>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )
            }
        </div>
    )
})