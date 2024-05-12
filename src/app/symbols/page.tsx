import {Metadata} from "next";
import {Symbols} from "./Symbols/Symbols";

export const metadata: Metadata = {
    title: "Meta Funding - Lexicon",
};

const SymbolsPage = () => {

    return (
        <>
            <Symbols/>
        </>
    )
}
export default SymbolsPage