import {svgIcons} from "../../../assets/svgIcons";
import {icons} from "./icons";

export const titles = [
    "Choose your trading style and",
    "get started",
]

export const panelTitle = "2 Step Evaluation";
export const chooseLabel = "Choose your trading style";
export const accountLabel = "Select account size"
export const bottomLabel = "Nevertheless, we cannot see that the solution proposed in this document is dependent on an amendment in section 1.10.3.";
export const feeLabel = "Registration fee";

export const marks = [
    {
        value: 0,
        label: '$10k',
        registrationFee: "110usd",
        discountedFee: "99usd",
    },
    {
        value: 1,
        label: '$25k',
        registrationFee: "230usd",
        discountedFee: "207usd",
    },
    {
        value: 2,
        label: '$50k',
        registrationFee: "350usd",
        discountedFee: "315usd",
    },
    {
        value: 3,
        label: '$100k',
        registrationFee: "540usd",
        discountedFee: "486usd",
    },
];

export const getStartedHrefs = [
    {
        "Normal": "https://checkout.bemfunding.com/?add-to-cart=20",
        "Swing": "https://checkout.bemfunding.com/?add-to-cart=22",
    },
    {
        "Normal": "https://checkout.bemfunding.com/?add-to-cart=24",
        "Swing": "https://checkout.bemfunding.com/?add-to-cart=26",
    },
    {
        "Normal": "https://checkout.bemfunding.com/?add-to-cart=28",
        "Swing": "https://checkout.bemfunding.com/?add-to-cart=29",
    },
    {
        "Normal": "https://checkout.bemfunding.com/?add-to-cart=16",
        "Swing": "https://checkout.bemfunding.com/?add-to-cart=18",
    },
]

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

export const data: ICardNew[] = [
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