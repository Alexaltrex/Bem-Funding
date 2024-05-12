import {Metadata} from "next";
import {EconomicCalendar} from "./EconomicCalendar/EconomicCalendar";

export const metadata: Metadata = {
    title: "Meta Funding - Economic Calendar",
};

const EconomicCalendarPage = () => {

    return (
        <>
            <EconomicCalendar/>
        </>
    )
}
export default EconomicCalendarPage