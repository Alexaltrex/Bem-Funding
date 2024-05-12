import {Metadata} from "next";
import {AboutUs} from "./AboutUs/AboutUs";

export const metadata: Metadata = {
    title: "Meta Funding - About Us",
};

const AboutUsPage = () => {


    return (
        <>
           <AboutUs/>
        </>
    )
}
export default AboutUsPage