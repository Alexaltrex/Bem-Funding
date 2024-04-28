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
    getByLetter, getSubtitlesByLetter,
    getSearchResult,
    getWords,
    ILexiconItem,
    ILexiconItemElement, ISubtitleElement, searchSubtitles
} from "./helpers";
import {FC, useRef, useState} from "react";
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
    const {appStore: {lang, setLexiconSubtitle, lexiconSubtitle}} = useStore();

    //form
    const onSubmit = ({value}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        if (value) {
            const _subtitles = searchSubtitles(json as ILexiconItem[], value)
            setRenderedSubtitles(_subtitles);
            if (_subtitles.length > 0) {
                setLexiconSubtitle(_subtitles[0])
            }
            setLetter("");
        } else {
            setSubtitleIndex(0);
            setRenderedSubtitles(getSubtitlesByLetter(json as ILexiconItem[], "A"));
            setLexiconSubtitle(getSubtitlesByLetter(json as ILexiconItem[], letter)[0]);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    const onClear = () => {
        setLetter("A");
        formik.resetForm();
        setSubtitleIndex(0);
        setRenderedSubtitles(getSubtitlesByLetter(json as ILexiconItem[], "A"));
        setLexiconSubtitle(getSubtitlesByLetter(json as ILexiconItem[], letter)[0]);
    }

    const [letter, setLetter] = useState("A");

    //const [content, setContent] = useState(getByLetter(json as ILexiconItem[], letter));
    const [renderedSubtitles, setRenderedSubtitles] = useState(getSubtitlesByLetter(json as ILexiconItem[], letter));

    const onLetter = (letter: string) => {
        formik.resetForm();
        setLetter(letter);
        setSubtitleIndex(0);
        setRenderedSubtitles(getSubtitlesByLetter(json as ILexiconItem[], letter));
        setLexiconSubtitle(getSubtitlesByLetter(json as ILexiconItem[], letter)[0]);
    }

    // dropdown
    const [showDropDown, setShowDropDown] = useState(false);
    const [words, setWords] = useState<string[]>([]);

    const onWord = (word: string) => {
        formik.setFieldValue("value", word);
        setWords([]);
        formik.submitForm();
    }

    const ref = useRef<HTMLDivElement>(null!);
    useOutsideClick(ref, () => setWords([]));

    const [subtitleIndex, setSubtitleIndex] = useState(0);

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
                               placeholder="Write here..."
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
                        Boolean(renderedSubtitles.length) ? (
                            <div className={style.content}>

                                <div className={style.contentCard}>

                                    <div className={style.top}>
                                        <p className={clsx(style.topTitle, montserrat.className)}>
                                            { letter ? `${letter} segment of the dictionary` : `Search result for "${formik.values.value}"`}

                                        </p>
                                    </div>

                                    <div className={style.bottom}>
                                        {
                                            renderedSubtitles.map((subtitle, key) => (
                                                <p key={key}
                                                   className={clsx({
                                                       [style.subtitle]: true,
                                                       [style.subtitle_selected]: key === subtitleIndex,
                                                   })}
                                                   onClick={() => {
                                                       setSubtitleIndex(key);
                                                       setLexiconSubtitle(subtitle);
                                                       if (typeof window === 'undefined') {
                                                           return
                                                       } else {
                                                           window.scrollTo({ top: 0, behavior: 'smooth' });
                                                       }
                                                   }}
                                                >
                                                    {subtitle.subtitle}
                                                </p>
                                            ))
                                        }
                                    </div>

                                </div>

                                <div className={style.subtitleInfo}>
                                    <p className={clsx(style.subtitleInfo_title, montserrat.className)}>
                                        {lexiconSubtitle?.subtitle}
                                    </p>
                                    <p className={style.subtitleInfo_content}>
                                        {lexiconSubtitle?.content}
                                    </p>
                                </div>
                            </div>


                            // <>
                            //     {
                            //         content.map((group, key) => (
                            //             <Group key={String(group.title) + key}
                            //                    group={group}
                            //             />
                            //         ))
                            //     }
                            // </>
                        ) : (
                            <p className={style.noResult}>No search result</p>
                        )
                    }


                </div>

            </div>
        </div>
    )
})

//========= GROUP =========//
interface IGroup {
    group: ILexiconItemElement
}

const Group: FC<IGroup> = observer(({
                                        group: {
                                            title,
                                            content,
                                            subtitles
                                        }
                                    }) => {
    const {appStore: {setLexiconSubtitle}} = useStore();

    const [index, setIndex] = useState(0);
    const onSubtitle = (index: number) => {
        setIndex(index);
        subtitles && setLexiconSubtitle(subtitles[index])
    }

    return (
        <div className={style.group}
        >
            <div className={style.top}>
                <p className={clsx(style.groupTitle, montserrat.className)}>
                    {title}
                </p>
                <p className={style.groupContent}>
                    {content}
                </p>
            </div>

            <div className={style.bottom}>
                <div className={style.subtitles}>
                    {
                        subtitles?.map(({subtitle}, key) => (
                            <p key={key}
                               className={clsx({
                                   [style.subtitle]: true,
                                   [style.subtitle_selected]: key === index,
                               })}
                               onClick={() => onSubtitle(key)}
                            >
                                {subtitle}
                            </p>
                        ))
                    }
                </div>
                {
                    subtitles && (
                        <div className={style.subtitleContent}>
                            <p className={clsx(style.subtitleContent_title, montserrat.className)}>
                                {subtitles[index]?.subtitle}
                            </p>
                            <p className={style.subtitleContent_content}>
                                {subtitles[index]?.content}
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    )
})