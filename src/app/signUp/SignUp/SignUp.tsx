'use client'

import style from "./SignUp.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import Link from "next/link";
import {Form, Formik, FormikErrors, FormikProps} from "formik";
import {mailRegexp} from "../../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../../../components/_common/FieldText/FieldText";
import {FieldPassword} from "../../../components/_common/FieldPassword/FieldPassword";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {CheckboxCustom} from "../../../components/_common/CheckboxCustom/CheckboxCustom";
import {useState} from "react";
import {svgIcons} from "../../../assets/svgIcons";

// @ts-ignore
import {getNames} from 'country-list';

const title = "Sign In";
const description = "Already have an account?";
const labelLogin = "Login";
const checkboxLabel1 = "I agree to the Terms and Conditions";
const checkboxLabel2 = "I accept the Privacy Policy";
const submitLabel = "Create Account"

export interface IValues {
    firstName: string
    lastName: string
    email: string
    country: string
    password: string
    passwordConfirm: string
}

const initialValues: IValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    passwordConfirm: "",
}

const validate = ({
                      firstName,
                      lastName,
                      email,
                      country,
                      password,
                      passwordConfirm,
                  }: IValues): FormikErrors<IValues> => {
    const errors: FormikErrors<IValues> = {};
    if (!firstName) {
        errors.firstName = "Required"
    }
    if (!lastName) {
        errors.lastName = "Required"
    }
    if (!mailRegexp.test(email)) {
        errors.email = "Invalid Email"
    }
    if (!email) {
        errors.email = "Required"
    }
    if (!password) {
        errors.password = "Required"
    }
    if (!passwordConfirm) {
        errors.passwordConfirm = "Required"
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
        errors.passwordConfirm = "Confirm error"
    }

    return errors
}


export const SignUp = observer(() => {
    const {appStore: {lang}} = useStore();

    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            console.log(values);

        } catch (e) {
            console.log(e)
        } finally {
            formikHelpers.resetForm();
        }
    }

    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);

    console.log(getNames())


    return (
        <div className={style.signUp}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <p className={style.description}>
                    <span>{translate(description, lang)}</span> <Link
                    href="/signUp">{translate(labelLogin, lang)}</Link>
                </p>

                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validate={validate}
                >
                    {(props: FormikProps<IValues>) => (
                        <Form autoComplete="off"
                              className={style.form}
                        >

                            <div className={style.twoFieldWrapper}>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("First name", lang)}
                                    </p>
                                    <FieldText name="firstName"
                                               background={false}
                                               className={style.field}
                                    />
                                </div>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("Last name", lang)}
                                    </p>
                                    <FieldText name="lastName"
                                               background={false}
                                               className={style.field}
                                    />
                                </div>
                            </div>

                            <div className={style.twoFieldWrapper}>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("Email", lang)}
                                    </p>
                                    <FieldText name="email"
                                               background={false}
                                               className={style.field}
                                    />
                                </div>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("Email", lang)}
                                    </p>
                                    <FieldText name="email"
                                               background={false}
                                               className={style.field}
                                    />
                                </div>
                            </div>

                            <div className={style.twoFieldWrapper}>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("Password", lang)}
                                    </p>
                                    <FieldPassword name="password"
                                                   background={false}
                                                   className={style.field}
                                    />
                                </div>
                                <div className={style.fieldWrapper}>
                                    <p className={style.label}>
                                        {translate("Confirm Password", lang)}
                                    </p>
                                    <FieldPassword name="passwordConfirm"
                                                   background={false}
                                                   className={style.field}
                                    />
                                </div>
                            </div>

                            <div className={style.ckeckboxWrapper}>
                                <div className={style.ckeckboxItem}>
                                    <CheckboxCustom checked={termsAndConditions}
                                                    onClick={() => setTermsAndConditions(!termsAndConditions)}
                                    />
                                    <p className={style.ckeckboxLabel}>
                                        {translate(checkboxLabel1, lang)}
                                    </p>
                                </div>
                                <div className={style.ckeckboxItem}>
                                    <CheckboxCustom checked={privacyPolicy}
                                                    onClick={() => setPrivacyPolicy(!privacyPolicy)}
                                    />
                                    <p className={style.ckeckboxLabel}>
                                        {translate(checkboxLabel2, lang)}
                                    </p>
                                </div>
                            </div>


                            {/*@ts-ignore*/}
                            <ButtonCustom type="submit"
                                          disabled={props.isSubmitting}
                                          label={translate(submitLabel, lang)}
                                          variant={ButtonVariant.blue}
                                          className={style.submitBtn}
                            />


                            <p className={style.or}>{translate("or", lang)}</p>

                            <div className={style.buttons}>
                                {
                                    [
                                        svgIcons.google,
                                        svgIcons.apple,
                                        svgIcons.facebook2
                                    ].map((icon, key) => (
                                        <button key={key}
                                                className={style.btn}
                                        >
                                            {icon}
                                        </button>
                                    ))
                                }
                            </div>


                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    )
})