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
        ]
    },
]