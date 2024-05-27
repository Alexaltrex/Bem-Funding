import type {Metadata} from "next";
import {TradingUpdates} from "./TradingUpdates/TradingUpdates";

export const metadata: Metadata = {
    title: "Meta Funding - TradingUpdates",
};

const TradingUpdatesPage = () => {
    return (
        <>
            <TradingUpdates/>
        </>
    )
}
export default TradingUpdatesPage