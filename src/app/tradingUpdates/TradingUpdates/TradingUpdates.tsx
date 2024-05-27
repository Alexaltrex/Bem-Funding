'use client';

import style from "./TradingUpdates.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";
import {FC, useEffect, useState} from "react";
import {useMediaQuery} from "@mui/material";
import {baseURL, ITradingUpdate, tradingUpdatesApi, uploadPath} from "../../../api/api";
import Skeleton from '@mui/material/Skeleton';
import { format } from 'date-fns';

const title = "Trading Updates";
const bntLabel = "See more";

export const TradingUpdates = observer(() => {
    const {appStore: {lang}} = useStore();

    const [items, setItems] = useState<null | ITradingUpdate[]>(null)
    const [loading, setLoading] = useState(false);
    const [seeMore, setSeeMore] = useState(false);

    useEffect(() => {
        const getter = async () => {
            try {
                setLoading(true);
                const response = await tradingUpdatesApi.getAll();
                setItems(response);
            } catch (e: any) {
                console.log(e.message)
            } finally {
                setLoading(false);
            }
        }
        getter().then();
    }, [])

    return (
        <div className={style.tradingUpdates}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                {
                    items && (
                        <div className={style.items}>
                            {
                                (seeMore ? items : items.slice(0, 4))
                                    .map((item, key) => (
                                        <Item key={key} {...item}/>
                                    ))
                            }
                        </div>
                    )
                }

                {
                    (loading || !Boolean(items)) && (
                        <div className={style.items}>
                            {
                                Array.from({length: 4}, (v, k) => k)
                                    .map(k => (
                                        <Skeleton key={k}
                                                  className={style.skeleton}
                                                  variant="rectangular"
                                            //height={236}
                                        />
                                    ))
                            }
                        </div>
                    )
                }

                {
                    (items && items.length > 4 && !seeMore) && (
                        <ButtonCustom label={translate(bntLabel, lang)}
                                      className={style.btn}
                                      variant={ButtonVariant.contained}
                                      onClick={() => setSeeMore(true)}
                        />
                    )
                }


            </div>
        </div>
    )
})

//========= ITEM =========//
const Item: FC<ITradingUpdate> = ({
                                      id,
                                      title,
                                      content,
                                      editor,
                                      date,
                                      image,
                                  }) => {

    const [open, setOpen] = useState(false);
    //const [openText, setOpenText] = useState(false);

    const isTabletAndMore = useMediaQuery('(min-width:768px)');

    // mobile 27
    // tablet: 51
    // desktop: 77

    const matchesTablet = useMediaQuery('(min-width:768px)');
    const matchesDesktop = useMediaQuery('(min-width:1140px)');
    const limit = matchesDesktop
        ? 75 * 6
        : matchesTablet ? 50 * 6 : 25 * 6

    return (
        <div className={style.item}>

            <img src={image ? uploadPath + image : ""} alt="" className={style.img}/>

            <div className={style.content}>

                <div className={style.top}>

                    <p className={clsx(style.itemTitle, montserrat.className)}>
                        {title}
                    </p>

                    <button onClick={() => setOpen(!open)}
                            className={clsx({
                                [style.topBtn]: true,
                                [style.topBtn_open]: open,
                            })}
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.9999 21.2108C13.4981 21.2108 12.9964 21.0192 12.6138 20.6368L0.574396 8.59729C-0.191465 7.83143 -0.191465 6.58971 0.574396 5.82416C1.33995 5.05861 2.58141 5.05861 3.34733 5.82416L13.9999 16.4774L24.6526 5.82454C25.4184 5.05898 26.6598 5.05898 27.4253 5.82454C28.1915 6.59009 28.1915 7.8318 27.4253 8.59766L15.3861 20.6372C15.0033 21.0196 14.5016 21.2108 13.9999 21.2108Z"
                                fill="#3AD0FF"/>
                        </svg>
                    </button>

                </div>

                <p className={style.date}>
                    {format(new Date(date), "d MMM yyyy")}
                </p>

                <p className={style.editor}>
                    Editor: {editor}
                </p>

                {
                    open ? (
                        <p className={style.text}>{content}</p>
                    ) : (
                        <p className={style.text}>
                            {content.slice(0, limit)}<span>...</span>
                        </p>
                    )
                }

            </div>
        </div>
    )
}