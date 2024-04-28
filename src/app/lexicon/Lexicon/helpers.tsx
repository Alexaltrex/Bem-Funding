import React from "react";

export interface ISubtitle {
    subtitle: string
    content: string
}

export interface ILexiconItem {
    title: string
    content: string
    subtitles: ISubtitle[]
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

    // filterJson(data)
    //     .forEach(({title}) => {
    //
    //         if (title && !_alphabet.includes(title[0])) {
    //             _alphabet.push(title[0])
    //         }
    //     })

    filterJson(data).forEach(({subtitles}, i) => {
        subtitles.forEach(({subtitle}) => {
                    if (subtitle) {
                        const _letter = isAlphabetSymbol(subtitle[0]) ? subtitle[0] : subtitle[1];
                        if (!_alphabet.includes(_letter)) {
                            _alphabet.push(_letter)
                        }

                    }
        })
    })

    return _alphabet.sort()
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

//========= GET BY LETTER /DEPRECATED/ =========//
export const getByLetter = (
    data: ILexiconItem[],
    letter: string
): ILexiconItemElement[] => {
    return transformToElement(filterJson(data).filter(({title}) => title && title[0] === letter))
}

//========= GET SUBTITLES BY LETTER /NEW/ =========//
export const getSubtitlesByLetter = (
    data: ILexiconItem[],
    letter: string
): ISubtitleElement[] => {
    const result = [] as ISubtitleElement[];
    filterJson(data).forEach(({subtitles}) => {
        subtitles.forEach(({subtitle, content}) => {
            const _letter = isAlphabetSymbol(subtitle[0]) ? subtitle[0] : subtitle[1];

            if (_letter === letter) {
                result.push({
                    subtitle: <>{subtitle}</>,
                    content: <>{content}</>
                })
            }
        })
    })
    return result
}

//========= GET REGEXP =========//
export const getRegExp = (str: string): RegExp => new RegExp(str, 'gi')

//========= SEARCH SUBTITLES =========//
export const searchSubtitles = (data: ILexiconItem[], subString: string): ISubtitleElement[] => {
    const _subtitles = [] as ISubtitleElement[]

    filterJson(data).forEach(({subtitles}) => {
        subtitles.forEach(({subtitle, content}) => {
            if (getRegExp(subString).test(subtitle)) {
                _subtitles.push({
                    subtitle: getSelectedString(subtitle, subString),
                    content: <>{content}</>
                })
            }
        })
    })

    return _subtitles
}


//========= GET SEARCH RESULT =========//
export const getSearchResult = (data: ILexiconItem[], subString: string) => {
    const filteredJson = filterJson(data);

    const searchResult = [] as ILexiconItem[]

    for (let i = 0; i < filteredJson.length; i++) {
        const {title, content, subtitles} = filteredJson[i]

        const matchedSubtitles = [] as ISubtitle[];
        for (let j = 0; j < subtitles.length; j++) {
            if (
                getRegExp(subString).test(subtitles[j].subtitle)
            ) {
                matchedSubtitles.push(subtitles[j])
            }
        }
        // если есть совпадение по subtitles - добавляем часть группы
        if (matchedSubtitles.length) {
            searchResult.push({
                title, content, subtitles: matchedSubtitles
            })
        }

        // // если совпадение в заголовке или контенте группы - добавляем в результат поиска всю группу
        // if ( getRegExp(subString).test(title) ||  getRegExp(subString).test(content)) {
        //     //match = true;
        //     searchResult.push(filteredJson[i])
        //     continue;
        // // если нет - добавляет часть группы
        // } else {
        //     const matchedSubtitles = [] as ISubtitle[];
        //     for (let j = 0; j < subtitles.length; j ++) {
        //         if (
        //             getRegExp(subString).test(subtitles[j].subtitle) ||
        //             getRegExp(subString).test(subtitles[j].content)
        //         ) {
        //             matchedSubtitles.push(subtitles[j])
        //         }
        //     }
        //     // если есть совпадение по subtitles - добавляем часть группы
        //     if (matchedSubtitles.length) {
        //         searchResult.push({
        //             title, content, subtitles: matchedSubtitles
        //         })
        //     }
        // }

    }

    return transformToElement(searchResult, subString)
}

//========= GET WORDS =========//
export const getWords = (data: ILexiconItem[], subString: string): string[] => {
    const words = [] as string[];
    const filteredJson = filterJson(data);

    for (let i = 0; i < filteredJson.length; i++) {
        const {title, content, subtitles} = filteredJson[i]

        for (let j = 0; j < subtitles.length; j++) {
            const subtitleWords = subtitles[j].subtitle.split(" ");

            for (let k = 0; k < subtitleWords.length; k++) {
                if (getRegExp(subString).test(subtitleWords[k]) && !words.includes(subtitleWords[k])) {
                    words.push(subtitleWords[k])
                }
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