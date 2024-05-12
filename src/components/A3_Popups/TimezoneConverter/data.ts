export const headers = [
    "Area",
    "Time",
    "CET Offset",
    "Start Hour Max Daily Loss",
    "End Hour Max Daily Loss",
]

export interface IDataItem {
    area: string
    time: string
    cetOffset: string
    start: string
    end: string
}

export const data = [
    {
       area: "CET Time",
       time: "00:25:38",
       cetOffset: "1 hrs",
       start: "00:00:01",
       end: "23:59:59"
    },
    {
        area: "FTMO Platform Time",
        time: "00:25:38",
        cetOffset: "1 hrs",
        start: "00:00:01",
        end: "23:59:59"
    },
    {
        area: "Your Local Time",
        time: "00:25:38",
        cetOffset: "1 hrs",
        start: "00:00:01",
        end: "23:59:59"
    },
]