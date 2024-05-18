import {dataNew, IExchange} from "./dataNew";
import {LangEnum} from "../../../const/lang";
import {getRegExp} from "../../lexicon/Lexicon/helpers";

//========= GET WORDS =========//
export interface IGetWords {
    lang: LangEnum
    marketIndex: number,
    subString: string
}

export const getWords = ({
                             lang,
                             marketIndex,
                             subString
                         }: IGetWords): string[] => {
    const words = [] as string[];
    const exchanges = dataNew[marketIndex].exchanges;

    for (let i = 0; i < exchanges.length; i++) {
        const {abbreviation, fullName} = exchanges[i];
        if (getRegExp(subString).test(abbreviation) && !words.includes(abbreviation)) {
            words.push(abbreviation);
        }

        const fullNameWords = fullName[lang].split(" ");
        for (let k = 0; k < fullNameWords.length; k++) {
            if (getRegExp(subString).test(fullNameWords[k]) && !words.includes(fullNameWords[k])) {
                words.push(fullNameWords[k])
            }
        }

    }

    return [...words].sort()
}

//========= SEARCH EXCHANGES =========//
export const searchExchanges = ({
                                    lang,
                                    marketIndex,
                                    subString
                                }: IGetWords) => {
    const _exchanges = [] as IExchange[]

    dataNew[marketIndex].exchanges.forEach((item) => {
        const {abbreviation, fullName} = item;
        if (getRegExp(subString).test(abbreviation) || getRegExp(subString).test(fullName[lang])) {
            _exchanges.push(item)
        }
    })

    return _exchanges
}
