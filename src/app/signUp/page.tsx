import type {Metadata} from "next";
import {SignUp} from "./SignUp/SignUp";

export const metadata: Metadata = {
    title: "Meta Funding - Sign Up",
};

const SignInPage = () => {
    return (
        <>
            <SignUp/>
        </>
    )
}
export default SignInPage