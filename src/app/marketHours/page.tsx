import type {Metadata} from "next";
import {MarketHours} from "./MarketHours/MarketHours";

export const metadata: Metadata = {
    title: "Meta Funding - Market Hours",
};

const MarketHoursPage = () => {
    return (
        <>
            <MarketHours/>
        </>
    )
}
export default MarketHoursPage