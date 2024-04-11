import {svgIcons} from "../../../assets/svgIcons";
import {ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

export interface ICard {
    icon: string,
    text: string[]
    button: {
        label: string
        variant: ButtonVariant
    }
}


export const cards: ICard[] = [
    {
        icon: "/png/main_page/journey0.png",
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
        icon: "/png/main_page/journey1.png",
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
        icon: "/png/main_page/journey2.png",
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