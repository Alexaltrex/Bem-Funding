import {svgIcons} from "../../../assets/svgIcons";
import {ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

export interface ICard {
    icon: React.JSX.Element,
    text: string[]
    button: {
        label: string
        variant: ButtonVariant
    }
}


export const cards: ICard[] = [
    {
        icon: svgIcons.journey_0,
        text: [
            "Launch Into",
            "Trader Success"
        ],
        button: {
            label: 'Join Waitlist',
            variant: ButtonVariant.contained
        }
    },
    {
        icon: svgIcons.journey_1,
        text: [
            "Your Triumph ",
            "Is Our Mission"
        ],
        button: {
            label: 'Explore Roadmap',
            variant: ButtonVariant.blue
        }
    },
    {
        icon: svgIcons.journey_2,
        text: [
            "Experienced Board ",
            "of Advisors",
        ],
        button: {
            label: 'Meet The Team',
            variant: ButtonVariant.contained
        }
    },
]