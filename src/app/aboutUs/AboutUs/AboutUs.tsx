'use client';

import style from "./AboutUs.module.scss";
import {items} from "./data";
import {clsx} from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {CloudComponent} from "../../../components/_common/Cloud/Cloud";

const title = "About Us";

export const AboutUs = observer(() => {
    const {appStore: {lang}} = useStore();

    return (
        <div className={style.aboutUs}>
            <div className={style.inner}>

                <h1 className={clsx(style.title, montserrat.className)}>
                    <p>
                        {translate(title, lang)}
                    </p>
                </h1>

                <div className={style.items}>
                    {
                        items.map(({src, label, texts}, key) => (
                            <div key={key}
                                 className={style.item}
                            >

                                <div className={style.imgWrapper}>
                                    <div className={style.cloudWrapper}>
                                        <CloudComponent/>
                                    </div>
                                    <img src={src} alt="" className={style.img}/>

                                </div>

                                <div className={style.content}>
                                    <p className={clsx(style.label, montserrat.className)}>
                                        {translate(label, lang)}
                                    </p>
                                    <div className={style.texts}>
                                        {
                                            texts.map((text, key) => (
                                                <p key={key}>
                                                    {translate(text, lang)}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
})