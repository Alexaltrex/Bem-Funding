import {FC} from "react";
import {clsx} from "clsx";
import style from "./Categories.module.scss"
import * as React from "react";
import {ICategory} from "../../../api/api";
import Skeleton from '@mui/material/Skeleton';
import {LangEnum, translate} from "../../../const/lang";
import {montserrat} from "../../../assets/fonts/fonts";


interface ICategories {
    lang: LangEnum
    className?: string
    categories: ICategory | null
    loadingCategory: boolean
}

export const Categories: FC<ICategories> = ({
                                                lang,
                                                className,
                                                categories,
                                                loadingCategory
                                            }) => {
    return (
        <div className={clsx(style.categories, Boolean(className) && className)}>

            <p className={clsx(style.subTitle, montserrat.className)}>
                {translate("Categories", lang)}
            </p>

            {
                categories && (
                    <div className={style.list}>
                        {
                            (categories as ICategory[]).map(({id, name, posts}) => (
                                <div key={id}
                                     className={style.row}
                                >
                                    <p className={style.label}>
                                        {name}
                                    </p>

                                    <p className={style.count}
                                    >
                                        {posts.length}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                )
            }


            {
                (loadingCategory || !categories) && (
                    <div className={style.list}>
                        {
                            [0, 1, 2, 3].map(key => (
                                <Skeleton key={key}
                                          className={style.skeleton}
                                          variant="rectangular"
                                />
                            ))
                        }
                    </div>
                )
            }

        </div>


    )
}