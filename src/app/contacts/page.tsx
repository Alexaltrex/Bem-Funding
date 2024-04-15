import {Metadata} from "next";
import {Contacts} from "./Contacts/Contacts";

export const metadata: Metadata = {
    title: "Meta Funding - Contacts",
};

const ContactsPage = () => {
    return (
        <>
            <Contacts/>
        </>
    )
}
export default ContactsPage