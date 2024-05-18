'use client'

import style from "./Lexicon.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import json from "../../../../public/json/lexicon.json"
import {
    getAlphabet,
    getWords,
    ILexiconItem,
    getGroupsByLetter, ILexiconGroupElement, searchGroups
} from "./helpers";
import {useRef, useState} from "react";
import {svgIcons} from "../../../assets/svgIcons";
import {FormikHelpers} from "formik/dist/types";
import {useFormik} from "formik";
import {useOutsideClick} from "../../../hooks/useOutsideClick";

const title = "Lexicon";

export interface IValues {
    value: string
}

const initialValues = {
    value: ""
}

//========= LEXICON =========//
export const Lexicon = observer(() => {
    const {appStore: {
        lang,
        lexiconGroup, setLexiconGroup,
        setLexiconPopup,
    }} = useStore();

    //form
    const onSubmit = ({value}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        if (value) {
            const groups = searchGroups(json as ILexiconItem[], value);
            setGroups(groups);
            if (groups.length > 0) {
                setLexiconGroup(groups[0])
            }
            setLetter("");
        } else {
            setGroupIndex(0);
            setGroups(getGroupsByLetter(json as ILexiconItem[], "#"));
            setLexiconGroup(getGroupsByLetter(json as ILexiconItem[], letter)[0]);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    const onClear = () => {
        setLetter("#");
        formik.resetForm();
        setGroupIndex(0);
        setGroups(getGroupsByLetter(json as ILexiconItem[], "#"));
        setLexiconGroup(getGroupsByLetter(json as ILexiconItem[], "#")[0]);
    }

    const [letter, setLetter] = useState("#");
    const [groups, setGroups] = useState(getGroupsByLetter(json as ILexiconItem[], letter))

    const onLetter = (letter: string) => {
        formik.resetForm();
        setLetter(letter);
        setGroupIndex(0);
        setGroups(getGroupsByLetter(json as ILexiconItem[], letter));
        setLexiconGroup(getGroupsByLetter(json as ILexiconItem[], letter)[0]);
    }

    // dropdown
    const [words, setWords] = useState<string[]>([]);
    const onWord = (word: string) => {
        formik.setFieldValue("value", word);
        setWords([]);
        formik.submitForm();
    }

    const ref = useRef<HTMLDivElement>(null!);
    useOutsideClick(ref, () => setWords([]));

    const [groupIndex, setGroupIndex] = useState(0);
    const onGroupTitleClick = (key: number, group: ILexiconGroupElement) => {
        setGroupIndex(key);
        setLexiconGroup(group);
        setLexiconPopup(true);
        if (typeof window === 'undefined') {
            return
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    return (
        <div className={style.lexicon}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <div className={style.formWrapper}>

                    <form onSubmit={formik.handleSubmit}
                          className={style.searchForm}
                          autoComplete="off"
                    >

                        <input name="value"
                               placeholder={translate("Write here", lang) + "..."}
                               value={formik.values.value}
                               onBlur={formik.handleBlur}
                               onChange={(e) => {
                                   formik.handleChange(e);
                                   if (e.target.value) {
                                       setWords(getWords(json as ILexiconItem[], e.target.value));
                                   }
                               }}
                        />

                        {
                            formik.values.value && (
                                <button onClick={() => onClear()}
                                >
                                    {svgIcons.close_gradient}
                                </button>
                            )
                        }

                        <button type="submit">
                            {svgIcons.search}
                        </button>
                    </form>

                    {
                        Boolean(words.length) && (
                            <div className={style.dropdownWrapper}
                                 ref={ref}
                            >
                                {
                                    words.map((_word, key) => (
                                        <button key={key}
                                                onClick={() => onWord(_word)}
                                        >
                                            {_word}
                                        </button>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <div className={style.alphabet}>
                    {
                        getAlphabet(json as ILexiconItem[]).map((_letter, key) => (
                            <button key={key}
                                    className={clsx({
                                        [style.letterBtn]: true,
                                        [style.letterBtn_selected]: _letter === letter,
                                    })}
                                    onClick={() => onLetter(_letter)}
                            >
                                <span>
                                    {
                                        Number.isNaN(Number(_letter)) ? _letter : "#" + _letter
                                    }
                                </span>
                            </button>
                        ))
                    }
                </div>


                <div className={style.contentWrapper}>

                    {
                        Boolean(groups.length) ? (
                            <div className={style.content}>

                                <div className={style.contentCard}>

                                    <div className={style.top}>
                                        <p className={clsx(style.topTitle, montserrat.className)}>
                                            {letter ? `"${Number.isNaN(Number(letter)) ? "" : "#"}${letter}" segment of the dictionary` : `Search result for "${formik.values.value}"`}
                                        </p>
                                    </div>

                                    <div className={style.bottom}>
                                        {
                                            groups.map((group, key) => (
                                                <p key={key}
                                                   className={clsx({
                                                       [style.title]: true,
                                                       [style.title_selected]: key === groupIndex,
                                                   })}
                                                   onClick={() => onGroupTitleClick(key, group)}
                                                >
                                                    {group.title}
                                                </p>
                                            ))
                                        }
                                    </div>

                                </div>

                                {
                                    lexiconGroup && (
                                        <div className={style.groupInfo}>
                                            <p className={clsx(style.groupInfo_title, montserrat.className)}>
                                                {lexiconGroup.title}
                                            </p>
                                            <p className={style.groupInfo_content}>
                                                {lexiconGroup.content}
                                            </p>

                                            <div className={style.groupSubtitles}>
                                                {
                                                    lexiconGroup.subtitles.map(({subtitle, content}, key) => (
                                                        <div key={key}
                                                             className={style.groupSubtitle}
                                                        >
                                                            <p className={clsx(style.groupSubtitle_subtitle, montserrat.className)}>{subtitle}</p>
                                                            <p className={style.groupSubtitle_content}>{content}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        ) : (
                            <p className={style.noResult}>
                                {translate("No search result", lang)}
                            </p>
                        )
                    }


                </div>

            </div>
        </div>
    )
})

