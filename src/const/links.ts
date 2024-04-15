import {SignIn} from "../app/signIn/SignIn/SignIn";
import {PrivacyPolicy} from "../app/privacyPolicy/PrivacyPolicy/PrivacyPolicy";

export interface ISubLink {
    label: string
    href: string
}

export interface ILink {
    title: string
    href?: string
    subLinks?: ISubLink[]
}

export const links = [
    {
        title: "Faq",
        href: "/faq",
    },
    {
        title: "About us",
        subLinks: [
            {
                label: "About us",
                href: "/aboutUs",
            },
            {
                label: "Contacts",
                href: "/contacts",
            },
            {
                label: "Leaderboard",
                href: "/leaderboard",
            },
            {
                label: "Sign In",
                href: "/signIn",
            },
            {
                label: "Sign Up",
                href: "/signUp",
            },
            {
                label: "Trading Updates",
                href: "/tradingUpdates",
            },
            {
                label: "Privacy Policy",
                href: "/privacyPolicy",
            },


        ]
    },
]