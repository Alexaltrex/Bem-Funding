import {action, makeObservable, observable} from "mobx";
import {LangEnum} from "../const/lang";

import {IFaqItem} from "../app/faq/Faq/faqs";
import {getSubtitlesByLetter, ILexiconItem, ISubtitleElement} from "../app/lexicon/Lexicon/helpers";
import {ICarreer} from "../app/careers/Careers/data";
import json from "../../public/json/lexicon.json"

export class AppStore {
    burgerMenu: boolean = false
    lang = LangEnum.ENG
    showRecoveryForm = false
    faqItem = null as null | IFaqItem
    lexiconSubtitle = getSubtitlesByLetter(json as ILexiconItem[], "A")[0] as null | ISubtitleElement
    career = null as null | ICarreer
    converter = false

    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                lang: observable,
                showRecoveryForm: observable,
                faqItem: observable,
                lexiconSubtitle: observable,
                career: observable,
                converter: observable,

                setBurgerMenu: action.bound,
                setLang: action.bound,
                setShowRecoveryForm: action.bound,
                setFaqItem: action.bound,
                setLexiconSubtitle: action.bound,
                setCareer: action.bound,
                setConverter: action.bound,
            }
        )
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu;
    }

    setLang(lang: LangEnum) {
        this.lang = lang;
    }

    setShowRecoveryForm(showRecoveryForm: boolean) {
        this.showRecoveryForm = showRecoveryForm
    }

    setFaqItem(faqItem: null | IFaqItem) {
        this.faqItem = faqItem
    }

    setLexiconSubtitle(lexiconSubtitle: null | ISubtitleElement) {
        this.lexiconSubtitle = lexiconSubtitle
    }

    setCareer(career: null | ICarreer) {
        this.career = career
    }

    setConverter(converter: boolean) {
        this.converter = converter
    }

}