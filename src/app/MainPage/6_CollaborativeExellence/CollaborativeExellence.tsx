'use client'

import style from "./CollaborativeExellence.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {icons} from "./icons";

const pre = 'Partners & Team';
const title = "Collaborative Exellence: Building Bridges, Driving Success";
const buttonLabel = "Get Started";

export const CollaborativeExellence = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.collaborativeExellence}>
            <div className={style.inner}>

                <div className={style.top}>
                    <p className={style.pre}>
                        {translate(pre, lang)}
                    </p>

                    <h2 className={style.title}>
                        {translate(title, lang)}
                    </h2>

                    {/*<ButtonCustom label={translate(buttonLabel, lang)}*/}
                    {/*              variant={ButtonVariant.blue}*/}
                    {/*              className={style.btn}*/}
                    {/*/>*/}
                </div>

                <div className={style.bottom}>
                    {
                        [
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                            {
                                onClick: () => {}
                            },
                        ].map(({onClick}, key) => (
                            <button key={key}
                                    onClick={() => onClick()}
                                    className={style.card}
                            >
                                {icons[key]}
                            </button>
                        ))
                    }
                </div>






            </div>
        </div>
    )
})