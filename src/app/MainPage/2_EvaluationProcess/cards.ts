export interface ICard {
    phase: number
    pre?: string
    title: string
    subtitle?: string
    descriptions: string[]
    src: string
    figure: string
    extra?: string
}

export const cards: ICard[] = [
    {
        phase: 1,
        pre: 'The Challenge',
        title: 'Evaluation Phase',
        descriptions: [
            "It is your initial step toward becoming a BEM Trader.",
            `Here, we require you to demonstrate your trading skills while maintaining to strict risk management protocols. Upon successful completion of all trading objectives, you will advance to Phase 2 - The Consistency.`
        ],
        src: '/png/main_page/howTo0.png',
        figure: '/png/main_page/howTo_figure_0.png',
    },
    {
        phase: 2,
        pre: 'The Consistency',
        title: 'Evaluation Phase',
        descriptions: [`During this phase, you are required to demonstrate that the skills shown in the initial phase were not coincidental. This stage is crucial for distinguishing committed traders from casual gamblers, emphasizing the importance of consistent and well-planned trading strategies.`],
        src: '/png/main_page/howTo1.png',
        figure: '/png/main_page/howTo_figure_1.png',
    },
    {
        phase: 3,
        title: 'BEM Trader',
        subtitle: `Get Rewarded, scale your profit split to 90%`,
        descriptions: [`Upon reaching this stage, you have officially become a BEM Trader. Your primary mission now is to uphold rigorous risk management practices consistently. By doing so, you may be eligible for rewards of up to 90%`],
        src: '/png/main_page/howTo2.png',
        figure: '/png/main_page/howTo_figure_2.png',
        extra: "/png/main_page/howTo_extra.png",
    },
]