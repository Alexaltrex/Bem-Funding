import {action, makeObservable, observable} from "mobx";
import {LangEnum} from "../const/lang";

import {IFaqItem} from "../app/faq/Faq/faqs";
import {
    getGroupsByLetter,
    ILexiconGroupElement,
    ILexiconItem,
} from "../app/lexicon/Lexicon/helpers";
import {ICarreer} from "../app/careers/Careers/data";
import json from "../../public/json/lexicon.json"
import {AlertColor} from "@mui/material";

interface IMailAlert {
    open: boolean
    message: string
    severity: AlertColor
}

export class AppStore {
    burgerMenu: boolean = false
    lang = LangEnum.ENG
    showRecoveryForm = false
    faqItem = null as null | IFaqItem
    lexiconGroup = getGroupsByLetter(json as ILexiconItem[], "1")[0] as null | ILexiconGroupElement
    lexiconPopup = false
    career = null as null | ICarreer
    converter = false
    mailAlert = {
        open: false,
        message: "test message",
        severity: 'success'
    } as IMailAlert

    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                lang: observable,
                showRecoveryForm: observable,
                faqItem: observable,
                lexiconGroup: observable,
                lexiconPopup: observable,
                career: observable,
                converter: observable,
                mailAlert: observable,

                setBurgerMenu: action.bound,
                setLang: action.bound,
                setShowRecoveryForm: action.bound,
                setFaqItem: action.bound,
                setLexiconGroup: action.bound,
                setLexiconPopup: action.bound,
                setCareer: action.bound,
                setConverter: action.bound,
                setMailAlert: action.bound,
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

    setLexiconGroup(lexiconGroup: ILexiconGroupElement) {
        this.lexiconGroup = lexiconGroup
    }

    setLexiconPopup(lexiconPopup: boolean) {
        this.lexiconPopup = lexiconPopup
    }

    setCareer(career: null | ICarreer) {
        this.career = career
    }

    setConverter(converter: boolean) {
        this.converter = converter
    }

    setMailAlert(mailAlert: IMailAlert) {
        this.mailAlert = mailAlert;
    }

}