"use client";

import style from "./FieldTimezone.module.scss";
import timezones from 'timezones-list';
import {FC, useEffect, useRef, useState} from "react";
import {clsx} from "clsx";
import {useOutsideButNotOnTargetClick} from "../../../hooks/useOutsideButNotOnTargetClick";
import {svgIcons} from "../../../assets/svgIcons";

// label: "Pacific/Midway (GMT-11:00)"
// name: "(GMT-11:00) Midway"
// tzCode: "Pacific/Midway"
// utc: "-11:00"

type FieldTimezoneProps = {
    timeZoneIndex: number
    onSelectHandler: (index: number) => void
    className?: string
}

export const FieldTimezone: FC<FieldTimezoneProps> = ({
                                                          timeZoneIndex,
                                                          onSelectHandler,
                                                          className,

}) => {
    const ref = useRef<HTMLDivElement>(null!);
    const targetRef = useRef<HTMLDivElement>(null!);
    const dropdownRef = useRef<HTMLDivElement>(null!);

    const [open, setOpen] = useState(false);

    const [bottom, setBottom] = useState(0);
    useEffect(() => {
        setBottom(ref?.current?.getBoundingClientRect().bottom);
    }, [ref.current])

    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        setInnerHeight(window.innerHeight);
    }, []);


    useEffect(() => {
        const handleResize = (event: any) => {
            setInnerHeight(event.target.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handler = (event: any) => {
            setBottom(ref?.current?.getBoundingClientRect().bottom);
        };
        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
        };
    }, []);

    useOutsideButNotOnTargetClick(dropdownRef, targetRef, () => setOpen(false));

    return (

            <div className={clsx({
                [style.fieldTimezone]: true,
                [style.fieldTimezone_open]: open,
            }, Boolean(className) && className)}
                 ref={ref}
            >

                <div className={style.field}
                     onClick={() => setOpen(!open)}
                     ref={targetRef}
                >
                    <p className={style.label}>
                        {timezones[timeZoneIndex].label}
                    </p>
                    {svgIcons.arrow_down_select}
                </div>

                {
                    open && (
                        <div className={clsx({
                            [style.dropdown]: true,
                            [style.dropdown_top]: innerHeight && bottom && innerHeight - bottom < 250,
                        })}
                             ref={dropdownRef}
                        >
                            <div className={style.dropdownInner}>
                                {
                                    timezones.map(({label}, key) => (
                                        <p key={key}
                                           className={style.dropdownItem}
                                           onClick={() => {
                                               onSelectHandler(key);
                                               setOpen(false);
                                           }}
                                        >
                                            {label}
                                        </p>
                                    ))
                                }
                            </div>

                        </div>
                    )
                }
            </div>

    )
}


