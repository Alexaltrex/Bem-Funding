import {Montserrat, Inter, Roboto_Mono} from "next/font/google";

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: [
        '700',
    ],
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    weight: [
        '400',
    ],
    display: 'swap',
});

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: [
        '400',
    ],
    display: 'swap',
})