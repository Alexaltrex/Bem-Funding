export const btns = [
    {
        index: 0,
        label: "$ 10 000",
    },
    {
        index: 1,
        label: "$ 25 000",
    },
    {
        index: 2,
        label: "$ 50 000",
    },
    {
        index: 3,
        label: "$ 100 000",
    },
]

interface ICardNew {
    order: string
    avatarSrc: string
    lent: string
    name: string
    country: string
    challengeValue: string
    earned: string
    endDate: string
    behindBrightestStar: string
}

export const cardsNew: ICardNew[] = [
    {
        order: "1st",
        avatarSrc: '/png/leaderboard/person_0.png',
        lent: '/png/leaderboard/lentRight_0.png',
        name: "Jenny",
        country: "Germany",
        challengeValue: "$200,000",
        earned: "15%",
        endDate: "Oct 4, 2022",
        behindBrightestStar: "25%",
    },
    {
        order: "2nd",
        avatarSrc: '/png/leaderboard/person_1.png',
        lent: '/png/leaderboard/lentRight_1.png',
        name: "Alex",
        country: "Germany",
        challengeValue: "$200,000",
        earned: "15%",
        endDate: "Oct 4, 2022",
        behindBrightestStar: "25%",
    },
    {
        order: "3rd",
        avatarSrc: '/png/leaderboard/person_2.png',
        lent: '/png/leaderboard/lentRight_2.png',
        name: "Alex",
        country: "Germany",
        challengeValue: "$200,000",
        earned: "15%",
        endDate: "Oct 4, 2022",
        behindBrightestStar: "25%",
    },
]