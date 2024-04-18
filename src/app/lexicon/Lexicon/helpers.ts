export interface ISubtitle {
    subtitle: string
    content: string
}

export interface ILexiconItem {
    title: string
    content: string
    subtitles: ISubtitle[]
}

export const getAlphabet = (data: ILexiconItem[]): string[] => {
    const _alphabet = [] as string[]

    data.forEach(({title}) => {

        if (title && !_alphabet.includes(title[0])) {
            _alphabet.push(title[0])
        }
    })

    return _alphabet
}

export const getByLetter = (
    data: ILexiconItem[],
    letter: string
) => data
    .filter(
        ({title}) => title && title[0] === letter
    )