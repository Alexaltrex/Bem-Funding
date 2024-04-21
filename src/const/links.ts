import {MarketHours} from "../app/marketHours/MarketHours/MarketHours";

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
        title: "How to Participate",
        subLinks: [
            {
                label: "The evoluation",
                href: "/evoluation",
            },
            {
                label: "Trading objectives",
                href: "/tradingObjectives",
            },
        ],
    },
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
                label: "Careers",
                href: "/careers",
            },
            {
                label: "Contacts",
                href: "/contacts",
            },

        ]
    },
    {
        title: "Affiliate Program",
        href: "/affiliateProgram",
    },
    {
        title: "Library",
        subLinks: [
            {
                label: "Blog",
                href: "/blog",
            },
            {
                label: "Lexicon",
                href: "/lexicon",
            },
            {
                label: "Trading Updates",
                href: "/tradingUpdates",
            },
            {
                label: "Economic Calendar",
                href: "/economicCalendar",
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
                label: "Privacy Policy",
                href: "/privacyPolicy",
            },
            {
                label: "Market Hours",
                href: "/marketHours",
            },
        ]
    },
]