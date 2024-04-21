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
import {Formik, FormikErrors, FormikProps} from "formik";
import {mailRegexp} from "../../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../../_common/FieldText/FieldText";
import {FieldTextarea} from "../../_common/FieldTextarea/FieldTextarea";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import Link from "next/link";

const title = "Start Your Career Today";
const subTitle = "Please fill in your information and send it to the employer.";

export interface IValues {
    fullName: string
    email: string
    contactNumber: string
    letter?: string
}

const initialValues: IValues = {
    fullName: "",
    email: "",
    contactNumber: "",
    letter: "",
}

const validate = ({fullName, email, contactNumber}: IValues): FormikErrors<IValues> => {
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

    if (!contactNumber) {
        errors.contactNumber = "Required"
    }

    return errors
}


export const CareersPopup = observer(() => {
    const {
        appStore: {
            lang,
            career, setCareer
        }
    } = useStore();

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(appRef.current, {
            scale: career ? 1 : 0.8,
            opacity: career ? 1 : 0,
            display: career ? "flex" : "none",
            duration: 0.3,
        });

    }, {dependencies: [career], scope: appRef});

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            console.log(values);

            formikHelpers.resetForm();
        } catch (e) {
            console.log(e)
        } finally {
            formikHelpers.resetForm();
        }
    }

    const [file, setFile] = useState<null | File>(null)

    const onClose = () => {
        setCareer(null);
        setFile(null);
    }


    return (
        <div className={style.careersPopup}
             ref={appRef}
        >
            {
                career && (
                    <div className={style.card}>

                        <Formik initialValues={initialValues}
                                onSubmit={onSubmit}
                                validate={validate}
                        >
                            {(props: FormikProps<IValues>) => (
                                <>

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
                                                Full name<span>*</span>
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
                                                Contact number<span>*</span>
                                            </p>
                                            <FieldText name="contactNumber"
                                                       className={style.field}
                                            />
                                        </div>
                                    </div>

                                    <div className={style.rows}>
                                        <div className={style.row}>
                                            <p className={style.rowLabel}>
                                                Cover letter<span>*</span>
                                            </p>
                                            <FieldTextarea name="letter"
                                                           className={style.field}
                                                           placeholder="Write here"
                                            />
                                        </div>
                                    </div>

                                    <div className={style.uploadWrapper}>
                                        <p className={style.label}>
                                            Resume
                                        </p>

                                        <div className={style.right}>
                                            <label className={clsx({
                                                [style.inputWrapper]: true,
                                                [style.inputWrapper_file]: file,
                                            })}>
                                                <input type="file"
                                                       accept=".pdf,.doc,.docx"
                                                       onChange={(e) => {
                                                           //console.log(e.target.files)
                                                           if (e.target.files) {
                                                               setFile(e.target.files[0])
                                                           }
                                                       }}
                                                />
                                                {svgIcons.file_attachment}
                                            </label>
                                            <p className={style.uploadDescription}>
                                                Upload your resume file <span>.pdf .doc .docx</span> (max 2mb)
                                            </p>
                                        </div>
                                    </div>

                                    <ButtonCustom label="Submit"
                                                  className={style.submitBtn}
                                        // @ts-ignore
                                                  type="submit"
                                                  variant={ButtonVariant.blue}
                                    />

                                    <p className={style.needSupport}>
                                        {translate("Need support?", lang)} <Link href="/contact"
                                                                                 onClick={() => onClose()}
                                    >
                                        {translate("Contact Us?", lang)}
                                    </Link>
                                    </p>


                                </>
                            )}
                        </Formik>


                    </div>
                )
            }
        </div>
    )
})