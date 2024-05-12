import Link from "next/link";
import style from "./Card.module.scss";
import {FC} from "react";
import {IBlogCard} from "../data";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum} from "../../../const/lang";

interface ICardComponent {
    lang: LangEnum
    card: IBlogCard
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
              style={{
                  backgroundImage: `url(${card.img})`
              }}
        >
            <p className={clsx(style.title, montserrat.className)}>
                {card.title}
            </p>

            <div className={style.bottom}>

                <p className={style.category}>
                    {card.category}
                </p>

                <p className={style.date}>
                    {card.date}
                </p>
            </div>
        </Link>
    )
}