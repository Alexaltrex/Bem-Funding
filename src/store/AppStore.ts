import {action, makeObservable, observable} from "mobx";
import {LangEnum} from "../const/lang";

export class AppStore {
    burgerMenu: boolean = false
    lang = LangEnum.ENG
    showRecoveryForm = false
    //recoveryFormSuccess = false

    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                lang: observable,
                showRecoveryForm: observable,
                //recoveryFormSuccess: observable,

                setBurgerMenu: action.bound,
                setLang: action.bound,
                setShowRecoveryForm: action.bound,
                //setRecoveryFormSuccess: action.bound,
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

    // setRecoveryFormSuccess(recoveryFormSuccess: boolean) {
    //     this.recoveryFormSuccess = recoveryFormSuccess
    // }

}