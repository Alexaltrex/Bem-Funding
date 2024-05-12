import type {Metadata} from "next";
import {Leaderboard} from "./Leaderboard/Leaderboard";

export const metadata: Metadata = {
    title: "Meta Funding - Leaderboard",
};

const LeaderboardPage = () => {
    return (
        <>
            <Leaderboard/>
        </>
    )
}
export default LeaderboardPage