'use client'

import style from "./Careers.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {LangEnum, translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {data, ICarreer} from "./data";
import {FC} from "react";
import {svgIcons} from "../../../assets/svgIcons";
import {ButtonCustom, ButtonVariant} from "../../../components/_common/ButtonCustom/ButtonCustom";

const titles = [
    "We search for",
    "talents",
]

const generalCard: ICarreer = {
    title: "General Purpose Application",
    time: "Full time",
    posted: "1 month ago",
    description: "We invite a reliable and creative specialist to work. We promise interesting work and a friendly team.",
    tags: [
        "General",
    ]
}

export const Careers = observer(() => {
    const {appStore: {lang, setCareer}} = useStore();


    return (
        <div className={style.careers}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    <span>{translate(titles[0], lang)}</span>
                    <span> {translate(titles[1], lang)}</span>
                </h2>

               <div className={style.panel}>
                   <div className={style.panelHeader}>
                       <p className={montserrat.className}>
                           {translate("General Purpose Application", lang)}
                       </p>
                   </div>
                   <div className={style.panelBody}>

                       <div className={style.info}>
                           <div className={style.infoRow}>
                               {svgIcons.watch_circle}
                               <p>{generalCard.time}</p>
                           </div>

                           <div className={style.infoRow}>
                               {svgIcons.watch_circle}
                               <p>Posted {generalCard.posted}</p>
                           </div>
                       </div>

                       <div className={style.description}>
                           <p>Are you looking for an exciting opportunity to grow your career in a dynamic and innovative environment?</p>
                           <p>Bem Funding is expanding, and we're on the lookout for talented individuals to join our team. Whether you're an experienced professional or just starting out, we encourage you to leave your CV with us!</p>
                       </div>

                       <div className={style.tags}>
                           {
                               generalCard.tags.map((tag, key) => (
                                   <p key={key}>
                                       {tag}
                                   </p>
                               ))
                           }
                       </div>

                       <ButtonCustom label={translate("Apply Now", lang)}
                                     className={style.btn}
                                     variant={ButtonVariant.blue}
                                     onClick={() => setCareer(generalCard)}
                       />

                   </div>
               </div>

                <div className={style.cardsMobile}>
                    {
                        data.map((card, key) => (
                            <Card lang={lang} key={key} card={card} onClick={() => setCareer(card)}/>
                        ))
                    }
                </div>

                <div className={style.cardsTablet}
                     style={{
                         gridTemplateRows: `repeat(${Math.floor(data.length / 2) + 1}, 1fr)`
                     }}
                >
                    {
                        data.map((card, key) => (
                            <Card lang={lang} key={key} card={card} onClick={() => setCareer(card)}/>
                        ))
                    }
                </div>

                <div className={style.cardsDesktop}
                     style={{
                         gridTemplateRows: `repeat(${Math.floor(data.length / 3) + 1}, 1fr)`
                     }}
                >
                    {
                        data.map((card, key) => (
                            <Card lang={lang} key={key} card={card} onClick={() => setCareer(card)}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
})

//========= CARD =========//
interface ICard {
    lang: LangEnum
    card: ICarreer
    onClick: () => void
}

const Card: FC<ICard> = ({
                             lang,
                             card,
                             onClick
                         }) => {
    return (
        <div className={style.card}>
            <div className={style.top}>
                <p className={montserrat.className}>
                    {card.title}
                </p>
            </div>
            <div className={style.bottom}>

                <div className={style.bottomTop}>

                    <div className={style.info}>
                        <div className={style.infoRow}>
                            {svgIcons.watch_circle}
                            <p>{card.time}</p>
                        </div>

                        <div className={style.infoRow}>
                            {svgIcons.watch_circle}
                            <p>Posted {card.posted}</p>
                        </div>
                    </div>

                    <p className={style.description}>
                        {card.description}
                    </p>

                </div>

                <div className={style.bottomBottom}>
                    <div className={style.tags}>
                        {
                            card.tags.map((tag, key) => (
                                <p key={key}>
                                    {tag}
                                </p>
                            ))
                        }
                    </div>

                    <ButtonCustom label={translate("Apply Now", lang)}
                                  className={style.btn}
                                  variant={ButtonVariant.blue}
                                  onClick={() => onClick()}
                    />
                </div>


            </div>
        </div>
    )
}