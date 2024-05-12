import {icons} from "./icons";

export interface ICard {
    icon: React.JSX.Element
    label: string
    description: string
}


export const cards = [
    {
        icon: icons[0],
        label: "Trade2Earn",
        description: "Get instantly rewarded in both phases of The Evaluation and on Funded Accounts with the world's first Trade2Earn program. Trade. Earn. Spend.",
    },
    {
        icon: icons[1],
        label: "Scaling Plan",
        description: "Scale your Funded Accounts to limitless heights and up to a 100% profit split with the generous Scaling Plan, by consistently generating profits on your funded account.",
    },
    {
        icon: icons[2],
        label: "Trading Perks",
        description: "Gain an extra edge in the market by exchanging your BEM Funding Tokens for Trading Perks. Commission-free trading, lower profit targets, daily payouts and more!",
    },
    {
        icon: icons[3],
        label: "Head Hunting",
        description: "Withstand The Evaluation, acquire payouts, and overcome challenges to earn unique NFT certificates. Grow your NFT collection and become the brightest rising star!",
    },
    {
        icon: icons[4],
        label: "Community",
        description: "Join our Discord and Telegram, and follow our Social Media. Gather insights, trading tips, and connect with the community to raise your trading game!",
    },
]