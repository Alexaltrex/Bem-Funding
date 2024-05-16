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

export interface ICard {
    order: string
    lent: string
    name: string
    attached: string
    earned: string
    profit: string
}

export const cards: ICard[] = [
    {
        order: "2nd",
        lent: '/png/leaderboard/lent_0.png',
        name: "John Smith",
        attached: "$ 123.456.000",
        earned: "15%",
        profit: "$ 23.456.000",
    },
    {
        order: "1st",
        lent: '/png/leaderboard/lent_1.png',
        name: "Constantine 123",
        attached: "$ 123.456.000",
        earned: "17%",
        profit: "$ 223.456.000",
    },
    {
        order: "3rd",
        lent: '/png/leaderboard/lent_2.png',
        name: "John Smith",
        attached: "$ 123.456.000",
        earned: "10%",
        profit: "$3.456.000",
    },
]