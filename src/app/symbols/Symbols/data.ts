export interface IDataItem {
    active: boolean,
    label: string
    title: string
    timeEnd: string
    information: {
        contractSize: string
        marginPercent: string
        leverageNormal: number
        leverageSwing: number
        commisionType: string
    },
    tradingHours: string[]
}

export const data: IDataItem[] = [
    {
        active: true,
        label: "AUD/CAD",
        title: "Australian Dollar vs Canadian Dollar",
        timeEnd: "08:10:20",
        information: {
            contractSize: "100.00",
            marginPercent: "12%",
            leverageNormal: 1,
            leverageSwing: 1,
            commisionType: "Type 1",
        },
        tradingHours: [
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
        ]
    },
    {
        active: true,
        label: "AUD/CAD",
        title: "Australian Dollar vs Canadian Dollar",
        timeEnd: "08:10:20",
        information: {
            contractSize: "100.00",
            marginPercent: "12%",
            leverageNormal: 1,
            leverageSwing: 1,
            commisionType: "Type 1",
        },
        tradingHours: [
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
        ]
    },
    {
        active: false,
        label: "AUD/CAD",
        title: "Australian Dollar vs Canadian Dollar",
        timeEnd: "08:10:20",
        information: {
            contractSize: "100.00",
            marginPercent: "12%",
            leverageNormal: 1,
            leverageSwing: 1,
            commisionType: "Type 1",
        },
        tradingHours: [
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
            "00:00 - 23:59",
        ]
    },
]