import type {Metadata} from "next";
import {SignIn} from "./SignIn/SignIn";

export const metadata: Metadata = {
    title: "Meta Funding - Sign In",
};

const SignInPage = () => {
    return (
        <>
            <SignIn/>
        </>
    )
}
export default SignInPage