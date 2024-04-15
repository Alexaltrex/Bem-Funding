'use client'

import style from "./Chance.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

const pre = 'JOIN THE TRADING UNIVERSE';
const title = "This Is Your Chance To Trade Among The Stars";
const buttonLabels = [
    "Start Challenge",
    "Join Our Discord"
]

export const Chance = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.chance}>
            <div className={style.inner}>

                <p className={style.pre}>
                    {translate(pre, lang)}
                </p>

                <h2 className={style.title}>
                    {translate(title, lang)}
                </h2>

                <div className={style.btns}>
                    <ButtonCustom label={translate(buttonLabels[0], lang)}
                                  className={style.btn}
                                  variant={ButtonVariant.blue}
                    />
                    <ButtonCustom label={translate(buttonLabels[1], lang)}
                                  className={style.btn}
                                  variant={ButtonVariant.contained}
                    />
                </div>


            </div>
        </div>
    )
})