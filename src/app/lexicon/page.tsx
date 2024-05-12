import {Metadata} from "next";
import {Lexicon} from "./Lexicon/Lexicon";

export const metadata: Metadata = {
    title: "Meta Funding - Lexicon",
};

const LexiconPage = () => {

    return (
        <>
            <Lexicon/>
        </>
    )
}
export default LexiconPage