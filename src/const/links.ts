export interface ISubLink {
    label: string
    href: string
}

export interface ILink {
    label: string
    href?: string
    subLinks?: ISubLink[]
}

export const links: ILink[] = [
    {
        label: "About",
        subLinks: [
            {
                label: "Bem",
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
        label: "FAQ",
        href: "/faq",
    },
    {
        label: "Trader's Library",
        subLinks: [
            {
                label: "Blog",
                href: "/blog",
            },
            {
                label: "Trading Updates",
                href: "/tradingUpdates",
            },
            {
                label: "Lexicon",
                href: "/lexicon",
            },
            {
                label: "Symbols",
                href: "/symbols",
            },
            {
                label: "Policies",
                href: "/privacyPolicy",
            },
            // {
            //     label: "Economic Calendar",
            //     href: "/economicCalendar",
            // },
            // {
            //     label: "Market Hours",
            //     href: "/marketHours",
            // },
        ]
    },
    {
        label: "Affiliate",
        href: "/affiliateProgram",
    },
    {
        label: "Leaderboard",
        href: "/leaderboard",
    },
]


// {
//     title: "How to Participate",
//     subLinks: [
//         {
//             label: "The evoluation",
//             href: "/evoluation",
//         },
//         {
//             label: "Trading objectives",
//             href: "/tradingObjectives",
//         },
//     ],
// },
// {
//     title: "Library",
//     subLinks: [
//         {
//             label: "Blog",
//             href: "/blog",
//         },
//         {
//             label: "Lexicon",
//             href: "/lexicon",
//         },
//         {
//             label: "Symbols",
//             href: "/symbols",
//         },
//         {
//             label: "Trading Updates",
//             href: "/tradingUpdates",
//         },
//         {
//             label: "Economic Calendar",
//             href: "/economicCalendar",
//         },
//         {
//             label: "Leaderboard",
//             href: "/leaderboard",
//         },
//         {
//             label: "Sign In",
//             href: "/signIn",
//         },
//         {
//             label: "Sign Up",
//             href: "/signUp",
//         },
//         {
//             label: "Privacy Policy",
//             href: "/privacyPolicy",
//         },
//         {
//             label: "Market Hours",
//             href: "/marketHours",
//         },
//     ]
// },

// {
//     label: "Symbols",
//     href: "/symbols",
// },
// {
//     label: "Leaderboard",
//     href: "/leaderboard",
// },
// {
//     label: "Sign In",
//     href: "/signIn",
// },
// {
//     label: "Sign Up",
//     href: "/signUp",
// },