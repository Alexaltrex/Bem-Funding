export interface ICard {
    phase: string
    pre: string
    title: string
    description: string
    src: string
    figure: string
    extra: string
}

export const cards: ICard[] = [
    {
        phase: 'PHASE 1',
        pre: 'EVALUATION PHASE',
        title: 'The Challenge',
        description: `The Challenge is your initial launch into the mission of becoming a Funded Star. Prove your trading skills, hit the profit target, maintain discipline, and showcase responsible risk management. Upon successful completion of all trading objectives, you'll rocket into Phase 2, The Verification.`,
        src: '/png/main_page/howTo0.png',
        figure: '/png/main_page/howTo_figure_0.png',
        extra: "",
    },
    {
        phase: 'PHASE 2',
        pre: 'EVALUATION PHASE',
        title: 'The Verification',
        description: `The Verification is your second and final launch in the mission to become a Funded Star. The trading objectives are gentler in this phase. Upon successful completion of the trading objectives and your results are verified, your Funded Trading Journey can ignite - the dawn of a beautiful journey.`,
        src: '/png/main_page/howTo1.png',
        figure: '/png/main_page/howTo_figure_1.png',
        extra: "",
    },
    {
        phase: 'PHASE 3',
        pre: 'EARN REAL MONEY - 80% TO 100 OF YOUR PROFITS',
        title: 'The Funded Star',
        description: `Congratulations! A new star has risen in our Funded Galaxy. Your mission now is to maintain risk management, trade with responsibility and consistency to scale your account to a 100% profit split, according to our scaling plan. Welcome to the next level of your Funded Trading Journey - your star is truly on the rise.`,
        src: '/png/main_page/howTo2.png',
        figure: '/png/main_page/howTo_figure_2.png',
        extra: "/png/main_page/howTo_extra.png",
    },
]