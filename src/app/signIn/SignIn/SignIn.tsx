'use client'

import style from "./SignIn.module.scss";
import {observer} from "mobx-react-lite";
import {translate} from "../../../const/lang";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {svgIcons} from "../../../assets/svgIcons";
import {Form, Formik, FormikErrors, FormikProps} from "formik";
import {mailRegexp} from "../../../const/form";
import {FormikHelpers} from "formik/dist/types";
import {FieldText} from "../../../components/_common/FieldText/FieldText";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {FieldPassword} from "../../../components/_common/FieldPassword/FieldPassword";

import Link from "next/link";

const title = "Sign In";
const secondTitle = "Raise Your Trading Game";
const text = "Trade yourself up to $400k in capital. Receive 80% to 100% of the profits. Get rewarded with Trade2Earn."

const buttons = [
    svgIcons.google,
    svgIcons.apple,
    svgIcons.facebook2,
]

export interface ISignInValues {
    email: string
    password: string
}

const initialValues: ISignInValues = {
    email: "",
    password: "",
}

const validate = ({email, password}: ISignInValues): FormikErrors<ISignInValues> => {
    const errors: FormikErrors<ISignInValues> = {};

    if (!mailRegexp.test(email)) {
        errors.email = "Invalid Email"
    }
    if (!email) {
        errors.email = "Required"
    }
    if (!password) {
        errors.password = "Required"
    }
    return errors
}

export const SignIn = observer(() => {
    const {appStore: {lang, setShowRecoveryForm}} = useStore();

    const onSubmit = async (values: ISignInValues, formikHelpers: FormikHelpers<ISignInValues>) => {
        try {
            console.log(values);

        } catch (e) {
            console.log(e)
        } finally {
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.signIn}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.content}>

                    <div className={style.top}>

                        <div className={style.top_texts}>
                            <p className={clsx(style.secondTitle, montserrat.className)}>
                                {translate(secondTitle, lang)}
                            </p>
                            <p className={style.text}>
                                {translate(text, lang)}
                            </p>
                        </div>

                        <img src="/png/sign_in/tube.png" alt="" className={style.tube}/>
                    </div>

                    <div className={style.bottom}>
                        <div className={style.bottom_inner}>

                            <div className={style.buttons}>
                                {
                                    buttons.map((icon, key) => (
                                        <button key={key}
                                                className={style.btn}
                                        >
                                            {icon}
                                        </button>
                                    ))
                                }
                            </div>

                            <p className={style.or}>
                                {translate("Or", lang)}
                            </p>


                            <Formik initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    validate={validate}
                            >
                                {(props: FormikProps<ISignInValues>) => (
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

                                        <div className={style.fieldWrapper}>
                                            <p className={style.label}>
                                                {translate("Password", lang)}
                                            </p>
                                            <FieldPassword name="password"
                                                       background={false}
                                                       className={style.field}
                                            />
                                        </div>


                                        {/*@ts-ignore*/}
                                        <ButtonCustom type="submit"
                                                      disabled={props.isSubmitting}
                                                      label={translate(title, lang)}
                                                      variant={ButtonVariant.blue}
                                                      className={style.submitBtn}
                                        />

                                    </Form>
                                )}
                            </Formik>

                           <button className={style.forgotBtn}
                                   onClick={() => setShowRecoveryForm(true)}
                           >
                               <span>{translate("Forgot password?", lang)}</span>
                           </button>

                            <p className={style.registerWrapper}>
                                <span>{translate("Don't have an account?", lang)} </span>
                                <Link href="/signUp"
                                      className={style.link}
                                >
                                    {translate("Register", lang)}
                                </Link>
                            </p>


                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
})