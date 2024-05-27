'use client'

import style from "./Blog.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Card} from "../Card/Card";
import {blogApi, IBlog, ICategory, uploadPath} from "../../../api/api";
import {Categories} from "../Categories/Categories";
import Skeleton from '@mui/material/Skeleton';
import {FormikHelpers, useFormik} from "formik";
import {svgIcons} from "../../../assets/svgIcons";

const title = "Blog";
const recentTitle = "Recent Post"
const featuredTitle = "Featured post"
const mostTitle = "Most read"

export interface IValues {
    value: string
}

const initialValues = {
    value: ""
}

//========= BLOG =========//
export const Blog = observer(() => {
    const {appStore: {lang}} = useStore();

    // categories
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    const [category, setCategory] = useState("All")
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [categories, setCategories] = useState<null | ICategory[]>(null);

    // blogs
    const [blogs, setBlogs] = useState<null | IBlog[]>(null);
    const [loadingBlogs, setLoadingBlogs] = useState(false);


    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoadingCategory(true);
                const categories = await blogApi.getCategories();
                setCategories(categories);
            } catch (e: any) {
                console.log(e.message)
            } finally {
                setLoadingCategory(false);
            }
        }
        getCategories().then();
    }, [])

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoadingBlogs(true);
                const blogs = await blogApi.getBlogs();
                setBlogs(blogs);
            } catch (e: any) {
                console.log(e.message)
            } finally {
                setLoadingBlogs(false);
            }
        }
        getBlogs().then();
    }, [])

    // search
    const [searched, setSearched] = useState(false);
    const [searchBlogs, setSearchBlogs] = useState<null | IBlog[]>(null);
    const [loadingSearchBlogs, setLoadingSearchBlogs] = useState(false);
    const onSubmit = async (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            if (values.value) {
                setLoadingSearchBlogs(true);
                setSearched(true);
                const response = await blogApi.searchBlogs({title: values.value, categoryId: selectedCategoryId })
                setSearchBlogs(response);
                console.log(response)
            }
        } catch (e: any) {
            console.log(e)
        } finally {
            setLoadingSearchBlogs(false);
        }

    }
    const formik = useFormik({
        initialValues,
        onSubmit
    });


    return (
        <div className={style.blog}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <form onSubmit={formik.handleSubmit}
                      className={style.searchForm}
                      autoComplete="off"
                >

                    <input name="value"
                           placeholder={translate("Write here", lang) + "..."}
                           value={formik.values.value}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                    />

                    {
                        searched ? (
                            <button onClick={() => {
                                formik.resetForm();
                                setSearched(false);
                                setSelectedCategoryId(-1);
                                setSearchBlogs(null);

                            }}>
                                {svgIcons.close_gradient}
                            </button>
                        ) : (
                            <button type="submit">
                                {svgIcons.search}
                            </button>
                        )
                    }


                </form>

                {
                    categories && (
                        <div className={style.categories}>
                            {
                                [
                                    ...(categories as ICategory[]),
                                    {id: -1, name: "All"},
                                ].map(({id, name}) => (
                                    <button key={id}
                                            className={clsx({
                                                [style.categoryItem]: true,
                                                [style.categoryItem_selected]: id === selectedCategoryId,
                                            })}
                                            onClick={() => {
                                                setSelectedCategoryId(id);
                                                formik.resetForm();
                                                setSearched(false);
                                                setSearchBlogs(null);
                                            }}
                                    >
                                        <span>{name}</span>
                                    </button>
                                ))
                            }
                        </div>
                    )
                }

                <>
                    {
                        (loadingCategory || !Boolean(categories)) && (
                            <div className={style.categories}>
                                {
                                    [0].map(key => (
                                            <Skeleton key={key}
                                                      className={style.categorySkeleton}
                                                      variant="rectangular"
                                            />
                                        )
                                    )
                                }
                            </div>
                        )
                    }
                </>

                <div className={style.wrapper}>

                    <div className={style.wrapperTop}>

                        <div className={style.cardsWrapper}>

                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {searched ? translate("Search result", lang) : translate(recentTitle, lang)}
                            </p>

                            {
                                blogs && !searched && (
                                    <div className={style.cards}>
                                        {
                                            (blogs as IBlog[]).slice(0, 4).map((card, key) => (
                                                <Card key={key}
                                                      lang={lang}
                                                      card={card}
                                                      className={style.card}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }

                            {
                                searched && searchBlogs && (searchBlogs.length > 0) && (
                                    <div className={style.cards}>
                                        {
                                            (searchBlogs as IBlog[]).slice(0, 4).map((card, key) => (
                                                <Card key={key}
                                                      lang={lang}
                                                      card={card}
                                                      className={style.card}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }

                            {
                                searched && searchBlogs && (searchBlogs.length === 0) && (
                                    <div className={style.cards}>
                                        <p className={style.noResult}>
                                            {translate("No search result", lang)}
                                        </p>
                                    </div>

                                )
                            }



                            {
                                (loadingBlogs || !blogs || loadingSearchBlogs) && (
                                    <div className={style.cards}>
                                        {
                                            [0, 1, 2, 3].map(key => (
                                                <Skeleton key={key}
                                                          className={clsx(style.card, style.cardSkeleton)}
                                                          variant="rectangular"
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }


                        </div>

                        <div className={style.cardsWrapper}>

                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {translate(featuredTitle, lang)}
                            </p>

                            {
                                blogs && (
                                    <div className={style.cards}>
                                        {
                                            (blogs as IBlog[])
                                                .sort((a, b) => {
                                                    if (a.rank > b.rank) {
                                                        return -1
                                                    }
                                                    if (a.rank < b.rank) {
                                                        return 1
                                                    }
                                                    return 0
                                                })
                                                .slice(0, 4).map((card, key) => (
                                                <Card key={key}
                                                      lang={lang}
                                                      card={card}
                                                      className={style.card}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }

                            {
                                (loadingBlogs || !blogs) && (
                                    <div className={style.cards}>
                                        {
                                            [0, 1, 2, 3].map(key => (
                                                <Skeleton key={key}
                                                          className={clsx(style.card, style.cardSkeleton)}
                                                          variant="rectangular"
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }


                        </div>


                    </div>

                    <div className={style.wrapperBottom}>

                        <Categories categories={categories}
                                    loadingCategory={loadingCategory}
                                    lang={lang}
                        />

                        <div className={style.mostRead}>
                            <p className={clsx(style.subTitle, montserrat.className)}>
                                {translate(mostTitle, lang)}
                            </p>

                            {
                                blogs && (
                                    <div className={style.mostRead_cards}>
                                        {
                                            (blogs as IBlog[]).sort((cardA, cardB) => {
                                                if (cardA.views > cardB.views) {
                                                    return -1
                                                }
                                                if (cardA.views < cardB.views) {
                                                    return 1
                                                }
                                                return 0
                                            })
                                                .map(({id, title, image}, key) => (
                                                    <Link key={key}
                                                          className={style.cardItem}
                                                          href={`/blog/${id}`}
                                                    >
                                                        <img src={image ? uploadPath + image : ""} alt=""/>

                                                        <p className={clsx(style.cardItemTitle, montserrat.className)}>
                                                            {title}
                                                        </p>
                                                    </Link>
                                                ))
                                        }
                                    </div>
                                )
                            }

                            {
                                (loadingBlogs || !blogs) && (
                                    <div className={style.mostRead_cards}>
                                        {
                                            [0, 1, 2, 3].map(key => (
                                                <Skeleton key={key}
                                                          className={style.mostReadCardSkeleton}
                                                          variant="rectangular"
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})