'use client'

import style from "./Blog.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";
import {useState} from "react";
import {cards} from "../data";
import Link from "next/link";
import {Card} from "../Card/Card";

const title = "Blog";
const recentTitle = "Recent Post"
const featuredTitle = "Featured post"
const mostTitle = "Most read"

export const Blog = observer(() => {
    const {appStore: {lang}} = useStore();

    const onSearch = async () => {
    }
    const onClear = () => {
    }

    const [category, setCategory] = useState("All")

    return (
        <div className={style.blog}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <SearchForm onSearch={onSearch}
                            onClear={onClear}
                />

                <div className={style.categories}>
                    {
                        [
                            "Finance",
                            "Invest",
                            "Work",
                            "News",
                            "All",
                        ].map((_category, key) => (
                            <button key={key}
                                    className={clsx({
                                        [style.categoryItem]: true,
                                        [style.categoryItem_selected]: _category === category,
                                    })}
                                    onClick={() => setCategory(_category)}
                            >
                                <span>{_category}</span>
                            </button>
                        ))
                    }
                </div>

                <div className={style.wrapper}>

                    <div className={style.wrapperTop}>

                        <div className={style.cardsWrapper}>

                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {translate(recentTitle, lang)}
                            </p>

                            <div className={style.cards}>
                                {
                                    cards.slice(0, 4).map((card, key) => (
                                        <Card key={key}
                                              card={card}
                                              className={style.card}
                                        />
                                    ))
                                }
                            </div>

                        </div>

                        <div className={style.cardsWrapper}>

                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {translate(featuredTitle, lang)}
                            </p>

                            <div className={style.cards}>
                                {
                                    cards.slice(0, 4).map((card, key) => (
                                        <Card key={key}
                                              card={card}
                                              className={style.card}
                                        />
                                    ))
                                }
                            </div>

                        </div>


                    </div>

                    <div className={style.wrapperBottom}>

                        <div className={style.categoriesCount}>
                            {
                                [
                                    {
                                        label: "Finance",
                                        count: 210,
                                        background: "#51faaa"
                                    },
                                    {
                                        label: "Invest",
                                        count: 50,
                                        background: "#3ad0ff"
                                    },
                                    {
                                        label: "Work",
                                        count: 100,
                                        background: "#7561ff"
                                    },
                                    {
                                        label: "News",
                                        count: 65,
                                        background: "#fa6131"
                                    },
                                ].map(({label, count, background}, key) => (
                                    <div key={key}
                                         className={style.row}
                                    >
                                        <p className={style.label}>
                                            {label}
                                        </p>

                                        <p className={style.count}
                                           style={{background}}
                                        >
                                            {count}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.mostRead}>
                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {translate(mostTitle, lang)}
                            </p>

                            <div className={style.cards}>
                                {
                                    cards.slice(0,6).map(({id, title, img}, key) => (
                                        <div key={key}
                                             className={style.cardItem}
                                        >
                                            <Link className={style.link}
                                                  href={`/blog/${id}`}
                                            >
                                                <img src={img} alt=""/>
                                            </Link>
                                            <p className={clsx(style.cardItemTitle, montserrat.className)}>
                                                {title}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>


            </div>


        </div>
    )
})