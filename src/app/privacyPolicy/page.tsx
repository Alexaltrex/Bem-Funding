import type {Metadata} from "next";
import {PrivacyPolicy} from "./PrivacyPolicy/PrivacyPolicy";

export const metadata: Metadata = {
    title: "Meta Funding - PrivacyPolicyPage",
};

const PrivacyPolicyPage = () => {
    return (
        <>
            <PrivacyPolicy/>
        </>
    )
}
export default PrivacyPolicyPage