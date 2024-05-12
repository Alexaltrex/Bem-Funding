import {svgIcons} from "../../../assets/svgIcons";

export interface ICard {
    title: string
    itemsBig: {
        icon: React.JSX.Element
        label: string
        value: string
    }[]
    itemsSmall: {
        icon: React.JSX.Element
        label: string
        value: string
    }[]
    description: string
}

export const cards: ICard[] = [
    {
        title: "1 Trading Challenge",
        itemsBig: [
            {
                icon: svgIcons.destination_card_0,
                label: "Simulated gain target",
                value: "6%",
            },
            {
                icon: svgIcons.destination_card_1,
                label: "Trading period",
                value: "Unlimited",
            },

        ],
        itemsSmall: [
            {
                icon: svgIcons.destination_card_2,
                label: "Min trading days",
                value: "1",
            },
            {
                icon: svgIcons.destination_card_3,
                label: "Max initial demo account Balance simulated loss",
                value: "8%",
            },
            {
                icon: svgIcons.destination_card_4,
                label: "Max daily simulated loss (Balance Based)",
                value: "4%",
            },
            {
                icon: svgIcons.destination_card_5,
                label: "Available simulated trading leverage",
                value: "50:1",
            },
        ],
        description: "Choose a simulated account size and try to reach the minimum simulated gains target for Phase 1. Subject to certain rules and objectives, your trading style is completely up to you!",
    },
    {
        title: "2 Trading Challenge",
        itemsBig: [
            {
                icon: svgIcons.destination_card_0,
                label: "Simulated gain target",
                value: "6%",
            },
            {
                icon: svgIcons.destination_card_1,
                label: "Trading period",
                value: "Unlimited",
            },

        ],
        itemsSmall: [
            {
                icon: svgIcons.destination_card_2,
                label: "Min trading days",
                value: "1",
            },
            {
                icon: svgIcons.destination_card_3,
                label: "Max initial demo account Balance simulated loss",
                value: "8%",
            },
            {
                icon: svgIcons.destination_card_4,
                label: "Max daily simulated loss (Balance Based)",
                value: "4%",
            },
            {
                icon: svgIcons.destination_card_5,
                label: "Available simulated trading leverage",
                value: "50:1",
            },
        ],
        description: "Choose a simulated account size and try to reach the minimum simulated gains target for Phase 1. Subject to certain rules and objectives, your trading style is completely up to you!",
    },
    {
        title: "3 Trading Challenge",
        itemsBig: [
            {
                icon: svgIcons.destination_card_0,
                label: "Simulated gain target",
                value: "6%",
            },
            {
                icon: svgIcons.destination_card_1,
                label: "Trading period",
                value: "Unlimited",
            },

        ],
        itemsSmall: [
            {
                icon: svgIcons.destination_card_2,
                label: "Min trading days",
                value: "1",
            },
            {
                icon: svgIcons.destination_card_3,
                label: "Max initial demo account Balance simulated loss",
                value: "8%",
            },
            {
                icon: svgIcons.destination_card_4,
                label: "Max daily simulated loss (Balance Based)",
                value: "4%",
            },
            {
                icon: svgIcons.destination_card_5,
                label: "Available simulated trading leverage",
                value: "50:1",
            },
        ],
        description: "Choose a simulated account size and try to reach the minimum simulated gains target for Phase 1. Subject to certain rules and objectives, your trading style is completely up to you!",
    },
]