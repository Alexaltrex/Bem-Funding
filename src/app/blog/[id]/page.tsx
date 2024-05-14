'use client'

import style from "./BlogItemPage.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {data} from "./data";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {cards} from "../data";
import {Card} from "../Card/Card";

const BlogItemPage = observer(() => {
    const {appStore: {lang}} = useStore();

    const {title, category, date, img, texts} = data
    return (
        <div className={style.blogItemPage}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {title}
                </h2>

                <div className={style.info}>

                    <p className={style.category}>
                        {category}
                    </p>

                    <p className={style.date}>
                        {date}
                    </p>
                </div>

                <img src={img} alt="" className={style.img}/>

                <div className={style.texts}>
                    {
                        texts.map((text, key) => (
                            <p key={key}>
                                {text}
                            </p>
                        ))
                    }
                </div>

                <div className={style.wrapper}>

                    <div className={style.wrapperTop}>
                        <p className={clsx(style.subTitle, montserrat.className)}>
                            {translate("Most read", lang)}
                        </p>

                        <div className={style.cards}>
                            {
                                cards.slice(0, 4).map((card, key) => (
                                    <Card key={key}
                                          lang={lang}
                                          card={card}
                                          className={style.card}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className={style.wrapperBottom}>

                        <p className={clsx(style.subTitle, montserrat.className)}>
                            {translate("Categories", lang)}
                        </p>

                        <div className={style.categoriesCount}>
                            {
                                [
                                    {
                                        label: "Finance",
                                        count: 210,
                                    },
                                    {
                                        label: "Invest",
                                        count: 50,
                                    },
                                    {
                                        label: "Work",
                                        count: 100,
                                    },
                                    {
                                        label: "News",
                                        count: 65,
                                    },
                                ].map(({label, count}, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        <p className={style.label}>
                                            {translate(label, lang)}
                                        </p>

                                        <p className={style.count}
                                        >
                                            {count}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
})
export default BlogItemPage