import Link from "next/link";
import style from "./Card.module.scss";
import {FC} from "react";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum} from "../../../const/lang";
import {IBlog, uploadPath} from "../../../api/api";
import { format } from 'date-fns';

interface ICardComponent {
    lang: LangEnum
    card: IBlog
    className?: string
}

export const Card: FC<ICardComponent> = ({
                                             lang,
                                             card,
                                             className
                                         }) => {
    return (
        <Link href={`/blog/${card.id}`}
              className={clsx(style.card, Boolean(className) && className)}
        >

            <img src={card.image ? uploadPath + card.image : ""} alt="" className={style.back}/>

            <p className={clsx(style.title, montserrat.className)}>
                {card.title}
            </p>

            <div className={style.bottom}>

                <p className={style.category}>
                    {card.category.name}
                </p>

                <p className={style.date}>
                    {format(new Date(card.date), "d MMM yyyy")}
                </p>
            </div>
        </Link>
    )
}