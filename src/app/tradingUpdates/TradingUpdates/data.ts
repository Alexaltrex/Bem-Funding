export interface IItem {
    title: string
    date: string
    editor: string
    text: string
    src: string
}

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const items: IItem[] = [
    {
        title: "Lorem ipsum Update",
        date: "11 mar 2024",
        editor: "John Smith",
        text,
        src: "/jpeg/tradingUpdates.jpg"
    },
    {
        title: "Lorem ipsum Update",
        date: "11 mar 2024",
        editor: "John Smith",
        text,
        src: "/jpeg/tradingUpdates.jpg"
    },
    {
        title: "Lorem ipsum Update",
        date: "11 mar 2024",
        editor: "John Smith",
        text,
        src: "/jpeg/tradingUpdates.jpg"
    },
    {
        title: "Lorem ipsum Update",
        date: "11 mar 2024",
        editor: "John Smith",
        text,
        src: "/jpeg/tradingUpdates.jpg"
    },
]