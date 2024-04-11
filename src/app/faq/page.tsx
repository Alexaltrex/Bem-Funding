import type {Metadata} from "next";
import {Faq} from "./Faq/Faq";

export const metadata: Metadata = {
    title: "Meta Funding - FAQ",
};


const FaqPage = () => {
    return (
        <>
            <Faq/>
        </>
    )
}
export default FaqPage