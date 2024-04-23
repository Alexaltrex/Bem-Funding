'use client'

import {observer} from "mobx-react-lite";
import {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useStore} from "../../../store/useStore";
import style from "./TimezoneConverter.module.scss"
import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {FieldTimezone} from "../../_common/FieldTimezone/FieldTimezone";
import {data, headers} from "./data";
import {ButtonCustom, ButtonVariant} from "../../_common/ButtonCustom/ButtonCustom";
import Link from "next/link";

const title = "Timezone converter";
const subTitle = "Timezones and Max Daily Loss";


export const TimezoneConverter = observer(() => {
    const {
        appStore: {
            lang,
            converter, setConverter
        }
    } = useStore();

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {
        gsap.to(appRef.current, {
            scale: converter ? 1 : 0.8,
            opacity: converter ? 1 : 0,
            display: converter ? "flex" : "none",
            duration: 0.3,
        });

    }, {dependencies: [converter], scope: appRef});

    const [timeZoneIndex, setTimeZoneIndex] = useState(0);


    return (
        <div className={style.timezoneConverter}
             ref={appRef}
        >

            <div className={style.card}>

                <button className={style.closeBtn}
                        onClick={() => setConverter(false)}
                >
                    {svgIcons.close}
                </button>

                <p className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </p>

                <div className={style.timezoneWrapper}>

                    <div className={style.timezoneWrapperTop}>
                        <p className={style.timezoneWrapperTopLabel}>
                            Choose your timezone
                        </p>

                        <button className={style.refreshButton}>
                            {svgIcons.refresh}
                        </button>
                    </div>

                    <FieldTimezone timeZoneIndex={timeZoneIndex}
                                   onSelectHandler={(index) => setTimeZoneIndex(index)}
                                   className={style.fieldTimezone}
                    />
                </div>

                <p className={clsx(style.subTitle, montserrat.className)}>
                    {translate(subTitle, lang)}
                </p>

                <div className={style.table}>

                    <div className={style.tableHeader}>
                        {
                            headers.map((label, key) => (
                                <div key={key}
                                     className={style.headerCell}
                                >
                                    <p key={key}>
                                        {label}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={style.tableBodyTablet}>
                        {
                            data.map((row, key) => (
                                <div key={key}
                                     className={style.tableRow}
                                >
                                    {
                                        Object.values(row).map((value, key) => (
                                            <div key={key}
                                                 className={style.bodyCell}
                                            >
                                                {value}
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className={style.tableBodyMobile}>
                        {
                            data.map((row, key) => (
                                <div key={key}
                                     className={style.row}
                                >
                                    <div className={style.rowTop}>
                                        {
                                            Object.values(row).slice(0, 3).map((value, key) => (
                                                <div key={key}
                                                     className={style.bodyCell}
                                                >
                                                    <p>{headers[key]}</p>
                                                    <p>{value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className={style.rowBottom}>
                                        {
                                            Object.values(row).slice(3, 5).map((value, key) => (
                                                <div key={key}
                                                     className={style.bodyCell}
                                                >
                                                    <p>{headers[key + 3]}</p>
                                                    <p>{value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>

                <p className={style.dataText}>
                    Today’s permitted loss will reset in 23:32:20
                </p>

                <ButtonCustom label={translate("Close", lang)}
                              className={style.close}
                              variant={ButtonVariant.blue}
                              onClick={() => setConverter(false)}
                />

                <p className={style.needSupport}>
                    {translate("Need support?", lang)} <Link href="/contacts"
                                                             onClick={() => setConverter(false)}
                >
                    {translate("Contact Us?", lang)}
                </Link>
                </p>


            </div>


        </div>
    )
})