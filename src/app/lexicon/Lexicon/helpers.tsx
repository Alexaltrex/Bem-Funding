import React from "react";

export interface ISubtitle {
    subtitle: string
    content: string
}

export interface ILexiconGroupElement {
    title: React.JSX.Element
    content: string
    subtitles: ISubtitle[]
}

export interface ILexiconItem {
    title: string
    content: string
    subtitles: {
        subtitle: string
        content: string
    }[]
}

export interface ISubtitleElement {
    subtitle: React.JSX.Element
    content: React.JSX.Element
}

export interface ILexiconItemElement {
    title: React.JSX.Element
    content: React.JSX.Element
    subtitles: ISubtitleElement[]
}


//========= FILTER JSON =========//
export const filterJson = (data: ILexiconItem[]) => {
    return data.filter(item => Boolean(item.title) && Boolean(item.content) && Boolean(item.subtitles) && Boolean(item.subtitles.length))
}

//========= GET ALPHABET =========//
export const getAlphabet = (data: ILexiconItem[]): string[] => {
    const _alphabet = [] as string[]

    filterJson(data).forEach(({title}, i) => {
        if (title) {
            if (isAlphabetSymbol(title[0]) && !_alphabet.includes(title[0])) {
                _alphabet.push(title[0])
            }
        }
    })
    return ["#", ..._alphabet.sort()]
}

//========= TRANSFORM TO ELEMENT =========//
export const transformToElement = (data: ILexiconItem[], subString?: string): ILexiconItemElement[] => {
    return data.map(({title, content, subtitles}) => ({
        title: <>{title}</>, //subString ? getSelectedString(title, subString) : <>{title}</>,
        content: <>{content}</>, //subString ? getSelectedString(content, subString) : <>{content}</>,
        subtitles: subtitles.map(({subtitle, content}) => ({
            subtitle: subString ? getSelectedString(subtitle, subString) : <>{subtitle}</>,
            content: <>{content}</>, //subString ? getSelectedString(content, subString) : <>{content}</>,
        }))
    }))
}

//========= GET GROUPS BY LETTER =========//
export const getGroupsByLetter = (
    data: ILexiconItem[],
    letter: string
): ILexiconGroupElement[] => {
    const _groups = [] as ILexiconGroupElement[]

    filterJson(data).forEach(({title, subtitles, content}) => {
        if (
            isAlphabetSymbol(letter) && title[0] === letter ||
            letter === "#" && isNumberSymbol(title[0])
        ) {
            _groups.push({
                title: <>{title}</>,
                content,
                subtitles,
            })
        }
    })

    return _groups
}

//========= GET REGEXP =========//
export const getRegExp = (str: string): RegExp => new RegExp(str, 'gi')

//========= SEARCH GROUPS =========//
export const searchGroups = (data: ILexiconItem[], subString: string): ILexiconGroupElement[] => {
    const _groups = [] as ILexiconGroupElement[];

    filterJson(data).forEach(({title, content, subtitles}) => {
        if (getRegExp(subString).test(title)) {
            _groups.push({
                title: getSelectedString(title, subString),
                content,
                subtitles
            })
        }
    })

    return _groups
}

//========= GET WORDS =========//
export const getWords = (data: ILexiconItem[], subString: string): string[] => {
    const words = [] as string[];
    const filteredJson = filterJson(data);

    for (let i = 0; i < filteredJson.length; i++) {
        const {title, content, subtitles} = filteredJson[i]
        const titleWords = title.split(" ");
        for (let k = 0; k < titleWords.length; k++) {
            if (getRegExp(subString).test(titleWords[k]) && !words.includes(titleWords[k])) {
                words.push(titleWords[k])
            }
        }
    }
    return [...words].sort()
}

//========= GET SELECTED STRING =========//
export const getSelectedString = (str: string, subString: string): React.JSX.Element => {
    const regexp = new RegExp(subString, 'gi');
    const matchAllQuestion = str.matchAll(regexp);
    const matchAllArrQuestion = Array.from(matchAllQuestion);

    const matchIndexes = matchAllArrQuestion.map(el => el.index)
    const matchIndexesFull = [...matchIndexes];
    if (subString.length > 1) {
        (matchIndexes as number[]).forEach(indexStart => {
            for (let i = indexStart + 1; i <= indexStart + subString.length - 1; i++) {
                //console.log(i)
                matchIndexesFull.push(i);
            }
        })
    }
    return (
        <>
            {
                str.split("").map((s, index) => {
                    return matchIndexesFull.includes(index) ? <span>{s}</span> : s
                    //return s
                })
            }
        </>
    )
}

//========= IS ALPHABET SYMBOL =========//
export const isAlphabetSymbol = (sybmol: string) => {
    return getRegExp(sybmol[0]).test("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
}

    //========= IS NUMBER SYMBOL =========//
export const isNumberSymbol = (sybmol: string) => {
    return getRegExp(sybmol[0]).test("0123456789")
}