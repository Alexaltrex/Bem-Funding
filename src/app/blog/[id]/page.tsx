'use client'

import style from "./BlogItemPage.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {cards} from "../data";
import {Card} from "../Card/Card";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {blogApi, IBlog, ICategory, uploadPath} from "../../../api/api";
import {Categories} from "../Categories/Categories";
import * as React from "react";
import { format } from 'date-fns'
import Skeleton from '@mui/material/Skeleton';

const BlogItemPage = observer(() => {
    const {appStore: {lang}} = useStore();

    // blog
    const params = useParams<{ id: string }>();
    //console.log(params.id)

    const [blog, setBlog] = useState<null | IBlog>(null);
    const [loadingBlog, setLoadingBlog] = useState(false);
    useEffect(() => {
        const getter = async () => {
            try {
                setLoadingBlog(true);
                const blog = await blogApi.getBlog(params.id);
                const category = await blogApi.getCategory(blog.categoryId)
                setBlog({
                    ...blog,
                    category: {name: category.name}
                });

            } catch (e: any) {
                console.log(e.message)
            } finally {
                setLoadingBlog(false);
            }
        }
        getter().then();
    }, []);


    // blogs
    const [blogs, setBlogs] = useState<null | IBlog[]>(null);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
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


    // categories
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [categories, setCategories] = useState<null | ICategory[]>(null);
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

    return (
        <div className={style.blogItemPage}>
            <div className={style.inner}>

                {
                    (loadingBlog || !blog ) && (
                        <>
                            <Skeleton className={style.titleSkeleton}
                                      variant="rectangular"
                            />
                            <Skeleton className={style.infoSkeleton}
                                      variant="rectangular"
                            />
                            <Skeleton className={style.imgSkeleton}
                                      variant="rectangular"
                            />
                            <Skeleton className={style.textsSkeleton}
                                      variant="rectangular"
                            />
                        </>
                    )
                }

                {
                    blog && (
                        <>
                            <h2 className={clsx(style.title, montserrat.className)}>
                                {(blog as IBlog).title}
                            </h2>

                            <div className={style.info}>

                                <p className={style.category}>
                                    {(blog as IBlog).category.name}
                                </p>

                                <p className={style.date}>
                                    {format(new Date((blog as IBlog).date), "d MMM yyyy")}

                                </p>
                            </div>

                            <img src={(blog as IBlog).image ? uploadPath + (blog as IBlog).image : ""} alt="" className={style.img}/>

                            <div className={style.texts}>
                                {
                                    (blog as IBlog).content.split("\r\n").map((text, key) => (
                                        <p key={key}>
                                            {text}
                                        </p>
                                    ))
                                }
                            </div>
                        </>
                    )
                }

                <div className={style.wrapper}>

                    <div className={style.wrapperTop}>
                        <p className={clsx(style.subTitle, montserrat.className)}>
                            {translate("Most read", lang)}
                        </p>

                        {
                            blogs && (
                                <div className={style.cards}>
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
                                            .slice(0, 4)
                                            .map((card, key) => (
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

                    <div className={style.wrapperBottom}>

                        <Categories categories={categories}
                                    loadingCategory={loadingCategory}
                                    lang={lang}
                        />

                    </div>

                </div>

            </div>
        </div>
    )
})
export default BlogItemPage