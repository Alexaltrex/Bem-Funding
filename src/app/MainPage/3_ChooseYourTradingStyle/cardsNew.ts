import {svgIcons} from "../../../assets/svgIcons";
import {icons} from "./icons";

export interface ICardNew {
    title: string
    icon?: string
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
}

export const cardsNew: ICardNew[] = [
    {
        title: "Phase 1 - The Challenge",
        itemsBig: [
            {
                icon: icons.target,
                label: "Profit Target",
                value: "9%",
            },
            {
                icon: icons.calendar,
                label: "Trading period",
                value: "Unlimited",
            },
        ],
        itemsSmall: [
            {
                icon: icons.calendarCheck,
                label: "Minimum trading days",
                value: "3",
            },
            {
                icon: icons.lineChartUp,
                label: "Max Drawdown",
                value: "9%",
            },
            {
                icon: icons.presentationChart,
                label: "Max daily drawdown",
                value: "4,5%",
            },
            {
                icon: icons.barChartCircle,
                label: "Drawdown type",
                value: "Balance Based",
            },
            {
                icon: icons.barLineChart,
                label: "Max available leverage",
                value: "1:100",
            },
        ],

    },
    {
        title: "Phase 2 - The Consistency",
        icon: "/png/checkCircleBroken.png",
        itemsBig: [
            {
                icon: icons.target,
                label: "Profit Target",
                value: "4,5%",
            },
            {
                icon: icons.calendar,
                label: "Trading period",
                value: "Unlimited",
            },
        ],
        itemsSmall: [
            {
                icon: icons.calendarCheck,
                label: "Minimum trading days",
                value: "3",
            },
            {
                icon: icons.lineChartUp,
                label: "Max Drawdown",
                value: "9%",
            },
            {
                icon: icons.presentationChart,
                label: "Max daily drawdown",
                value: "4,5%",
            },
            {
                icon: icons.barChartCircle,
                label: "Drawdown type",
                value: "Balance Based",
            },
            {
                icon: icons.barLineChart,
                label: "Max available leverage",
                value: "1:100",
            },
        ],
    },
    {
        title: "BEM Account",
        icon: "/png/checkCircleBroken.png",
        itemsBig: [
            {
                icon: icons.target,
                label: "Profit Target",
                value: "-",
            },
            {
                icon: icons.calendar,
                label: "Trading period",
                value: "Unlimited",
            },
        ],
        itemsSmall: [
            {
                icon: icons.calendarCheck,
                label: "Minimum trading days",
                value: "3",
            },
            {
                icon: icons.lineChartUp,
                label: "Max Drawdown",
                value: "9%",
            },
            {
                icon: icons.presentationChart,
                label: "Max daily drawdown",
                value: "4,5%",
            },
            {
                icon: icons.barChartCircle,
                label: "Drawdown type",
                value: "Balance Based",
            },
            {
                icon: icons.barLineChart,
                label: "Max available leverage",
                value: "1:100",
            },
        ],
    },
]