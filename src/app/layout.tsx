import type {Metadata} from "next";
import "../assets/styles/globals.css";
import style from "./Layout.module.scss"
import {inter} from "../assets/fonts/fonts";
import {clsx} from "clsx";
import {StoreProvider} from "../store/StoreProvider";
import {Header} from "../components/A0_Header/Header";
import {BurgerMenu} from "../components/A1_BurgerMenu/BurgerMenu";
import {Footer} from "../components/A2_Footer/Footer";
import {RecoveryForm} from "../components/A3_RecoveryForm/RecoveryForm";
import {FaqPopup} from "../components/A3_Popups/FaqPopup/FaqPopup";
import {LexiconPopup} from "../components/A3_Popups/LexiconPopup/LexiconPopup";
import {CareersPopup} from "../components/A3_Popups/CareersPopup/CareersPopup";
import {TimezoneConverter} from "../components/A3_Popups/TimezoneConverter/TimezoneConverter";

export const metadata: Metadata = {
    title: "Meta Funding",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>

        <StoreProvider>
            <div className={clsx(style.layout, inter.className)}>

                <img src="/png/header_blur.png" alt="" className={style.header_blur}/>
                <img src="/png/footer_blur.png" alt="" className={style.footer_blur}/>

                <Header/>
                <BurgerMenu/>
                <RecoveryForm/>
                <FaqPopup/>
                <LexiconPopup/>
                <CareersPopup/>
                <TimezoneConverter/>

                <main>
                    {children}
                </main>

                <Footer/>
            </div>
        </StoreProvider>


        </body>
        </html>
    );
}
