"use client"

import style from "./RecoveryForm.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {clsx} from "clsx";
import {translate} from "../../const/lang";
import {ISignInValues} from "../../app/signIn/SignIn/SignIn";
import {Form, Formik, FormikErrors, FormikProps, useFormik} from "formik";
import {mailRegexp} from "../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../_common/FieldText/FieldText";
import {FieldPassword} from "../_common/FieldPassword/FieldPassword";
import {ButtonCustom, ButtonVariant} from "../_common/ButtonCustom/ButtonCustom";
import {svgIcons} from "../../assets/svgIcons";
import {useRef, useState} from "react";
import {useOutsideClick} from "../../hooks/useOutsideClick";

const title = "Password recovery";
const titleSuccess = "Recovery link sent";
const text = "We will send a password recovery link to your e-mail";
const textSuccess = "Check your email to change password";
const description = "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.";
const buttonLabel = "Submit";
const buttonLabelClose = "Close";

export interface IValues {
    email: string
}

const initialValues: IValues = {
    email: "",
}

const validate = ({email}: IValues): FormikErrors<IValues> => {
    const errors: FormikErrors<ISignInValues> = {};

    if (!mailRegexp.test(email)) {
        errors.email = "Invalid Email"
    }
    if (!email) {
        errors.email = "Email required"
    }
    return errors
}

export const RecoveryForm = observer(() => {
    const {
        appStore: {
            lang,
            showRecoveryForm, setShowRecoveryForm
        }
    } = useStore();

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            console.log(values);
            setSuccess(true);
            formikHelpers.resetForm();
        } catch (e) {
            console.log(e)
        } finally {
            formikHelpers.resetForm();
        }
    }

    const ref = useRef<HTMLDivElement>(null!);
    useOutsideClick(ref, () => setShowRecoveryForm(false));

    const [success, setSuccess] = useState(false);

    const onClose = () => {
        setShowRecoveryForm(false);
        setSuccess(false);
    }

    return (
        <div className={clsx({
            [style.recoveryForm]: true,
            [style.recoveryForm_show]: showRecoveryForm,
        })}>

            <div className={style.card}
                 ref={ref}
            >

                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validate={validate}
                >
                    {(props: FormikProps<IValues>) => (
                        <>
                            <button className={style.closeBtn}
                                    onClick={() => {
                                        onClose();
                                        props.resetForm();
                                    }}
                            >
                                {svgIcons.close}
                            </button>

                            {
                                success && (
                                    <div className={style.check}>
                                        {svgIcons.check_circle_broken}
                                    </div>
                                )
                            }

                            <p className={style.title}>
                                {translate(success ? titleSuccess : title, lang)}
                            </p>

                            <p className={style.text}>
                                {translate(text, lang)}
                            </p>

                            {
                                success && (
                                    <ButtonCustom label={translate(buttonLabelClose, lang)}
                                                  variant={ButtonVariant.blue}
                                                  className={style.close}
                                                  onClick={() => {
                                                      onClose();
                                                      props.resetForm();
                                                  }}
                                    />
                                )
                            }

                            {
                                !success && (
                                    <Form autoComplete="off"
                                          className={style.form}
                                    >
                                        <div className={style.fieldWrapper}>
                                            <p className={style.label}>
                                                {translate("Email", lang)}
                                            </p>
                                            <FieldText name="email"
                                                       background={false}
                                                       className={style.field}
                                            />
                                        </div>

                                        {/*@ts-ignore*/}
                                        <ButtonCustom type="submit"
                                                      disabled={props.isSubmitting}
                                                      label={translate(buttonLabel, lang)}
                                                      variant={ButtonVariant.blue}
                                                      className={style.submitBtn}
                                        />

                                        <p className={style.description}>
                                            {translate(description, lang)}
                                        </p>

                                    </Form>
                                )
                            }
                        </>
                    )}
                </Formik>


            </div>


        </div>
    )
})