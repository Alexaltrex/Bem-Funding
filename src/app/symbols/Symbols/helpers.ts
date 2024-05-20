import {dataNew, IExchange, TradingHoursType} from "./dataNew";
import {LangEnum} from "../../../const/lang";
import {getRegExp} from "../../lexicon/Lexicon/helpers";
import moment from "moment-timezone";

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

//========= GET WORK STATUS =========//
type GetWorkStatusType = (tradingHours: TradingHoursType) => ({ active: boolean, secondsBefore: number })

export const getWorkStatus: GetWorkStatusType = (tradingHours) => {

    let active; // работает или нет
    let secondsBefore = 0; // количество секунд до открытия или закрытия

    // "Monday" 1
    // "Tuesday" 2
    // "Wednesday" 3
    // "Thursday" 4
    // "Friday" 5
    // "Saturday" 6
    // "Sunday" 0

    const dateNow = new Date(moment().tz("Europe/Moscow").format());
    const day = (dateNow).getDay();


    const realIndexOfDay = day === 0 ? 6 : day - 1; // правильный индекс дня (по порядку, начиная с 0)

    const hoursStart = Number(tradingHours[0].slice(0, 2)); // число часов открытия
    const minutesStart = Number(tradingHours[0].slice(3, 5)); // число минут открытия
    const allSecondsStart = (hoursStart * 60 + minutesStart) * 60;

    const hoursEnd = Number(tradingHours[0].slice(-5, -3)); // число часов закрытия
    const minutesEnd = Number(tradingHours[0].slice(-2)); // число минут минут
    const allSecondsEnd = (hoursEnd * 60 + minutesEnd) * 60;

    const hours = (dateNow).getHours(); // текущее число часов
    const minutes = (dateNow).getMinutes(); // текущее число минут
    const seconds = (dateNow).getSeconds();
    const allSecondsNow = (hours * 60 + minutes) * 60 + seconds;

    // если текущий день - суббота или воскресенье и эти дни - нерабочие
    if ((realIndexOfDay === 5 || realIndexOfDay === 6) && tradingHours[5] === "Trading is closed") {
        active = false;

        if (realIndexOfDay === 5) { // если суббота
            secondsBefore = (24 * 60 * 60 - allSecondsNow) + 24 * 60 * 60 + allSecondsStart;
        }
        if (realIndexOfDay === 6) { // если воскресенье
            secondsBefore = (24 * 60 * 60 - allSecondsNow) + allSecondsStart;
        }

    } else { // если текущий день - рабочий

        // если текущее время - рабочее
        if (allSecondsNow >= allSecondsStart && allSecondsNow <= allSecondsEnd) {
            active = true;
            secondsBefore = allSecondsEnd - allSecondsNow;
        } else { // если текущее время - не рабочее
            active = false;

            // если ЕЩЕ не открылся
            if (allSecondsNow < allSecondsStart) {
                secondsBefore = allSecondsStart - allSecondsNow;
            } else { // если УЖЕ закрылся
                // если суббота и воскресенье - рабочие (т.е. все дни - рабочие)
                // или суббота и воскресенье - не рабочие, но следующий день - рабочий
                if (
                    (tradingHours[5] !== "Trading is closed") ||
                    (tradingHours[5] === "Trading is closed" && realIndexOfDay <= 3)
                ) {
                    secondsBefore = (24 * 60 * 60 - allSecondsNow) + allSecondsStart;
                }

                // суббота и воскресенье - не рабочие, и текущий день - пятница
                if (tradingHours[5] === "Trading is closed" && realIndexOfDay === 4) {
                    secondsBefore = (24 * 60 * 60 - allSecondsNow) + 2 * 24 * 60 * 60 + allSecondsStart;
                }
            }

        }
    }

    return ({active, secondsBefore})
}

//========= CONVERT SECONDS TO COUNTDOWN =========//
export const convertSecondsToCountdown = (seconds: number): string => {
    const secondsString = convertToTwoDigit(getSecs(seconds * 1000));
    const minutesString = convertToTwoDigit(getMins(seconds * 1000));
    const hoursString = convertToTwoDigit(getHours(seconds * 1000));
    const daysString = convertToTwoDigit(getDays(seconds * 1000));
    return daysString === "00"
        ? `${hoursString}:${minutesString}:${secondsString}`
        : `${daysString}:${hoursString}:${minutesString}:${secondsString}`
}

export const getDays = (ms: number) => {
    const days = Math.trunc(ms / (60000 * 60 * 24));
    return days
}
export const getHours = (ms: number) => {
    const min = ms / 60000;
    const days = Math.trunc(min / (60 * 24));
    const hours = Math.trunc(((min - days * 24 * 60)) / 60);
    return hours;
}
export const getMins = (ms: number) => {
    const min = ms / 60000;
    const days = Math.trunc(min / (60 * 24));
    const hours = Math.trunc(((min - days * 24 * 60)) / 60);
    const minutes = Math.trunc(min - days * 24 * 60 - hours * 60)
    return minutes;
}
export const getSecs = (ms: number) => {
    const secs = ms / 1000;
    const days = Math.trunc(secs / (60 * 60 * 24));
    const hours = Math.trunc(((secs - days * 24 * 60 * 60)) / (60 * 60));
    const minutes = Math.trunc((secs - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
    const seconds = Math.trunc(secs - days * 24 * 60 * 60 - hours * 60 * 60 - 60 * minutes);
    return seconds;
}
export const convertToTwoDigit = (num: number): string => num > 9 ? String(num) : `0${num}`;