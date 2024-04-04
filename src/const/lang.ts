export enum LangEnum {
    ENG = "ENG",
    TUR = "TUR"
}

export const  dictionary = {

}

export const translate = (str: string, lang: LangEnum):string => {
    if (lang === LangEnum.ENG) {
        return str
    } else {
        if (dictionary.hasOwnProperty(str)) {
            // @ts-ignore
            return dictionary[str]
        } else {
            return "???"
        }
    }
}

// {translate("", lang)}