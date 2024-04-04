import {action, makeObservable, observable} from "mobx";
import {LangEnum} from "../const/lang";

export class AppStore {
    burgerMenu: boolean = false
    lang = LangEnum.ENG


    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                lang: observable,

                setBurgerMenu: action.bound,
                setLang: action.bound,
            }
        )
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu;
    }

    setLang(lang: LangEnum) {
        this.lang = lang;
    }

}