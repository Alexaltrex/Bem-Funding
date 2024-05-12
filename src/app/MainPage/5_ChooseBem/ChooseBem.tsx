'use client'

import style from "./ChooseBem.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

const title = "Choose BEM for the Best and Most Reliable Services in the Field";
const buttonLabels = [
    "Get Started",
    "Join Our Discord"
]

export const ChooseBem = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.chooseBem}>
            <div className={style.inner}>

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