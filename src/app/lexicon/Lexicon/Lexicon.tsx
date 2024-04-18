'use client'

import style from "./Lexicon.module.scss"
import {clsx} from "clsx";
import {montserrat} from "../../../assets/fonts/fonts";
import {translate} from "../../../const/lang";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {SearchForm} from "../../../components/_common/SearchForm/SearchForm";
import json from "../../../../public/json/lexicon.json"
import {getAlphabet, getByLetter, ILexiconItem} from "./helpers";
import {FC, useState} from "react";
import {log} from "node:util";

const title = "Lexicon";


export const Lexicon = observer(() => {
    const {appStore: {lang}} = useStore();

    const onSearch = async () => {
    }
    const onClear = () => {
    }

    //console.log(json)
    // console.log(
    //     getAlphabet(json as ILexiconItem[])
    // )

    const [letter, setLetter] = useState("1");
    const [content, setContent] = useState(
        getByLetter(json as ILexiconItem[], letter)
    )

    //console.log(content)

    const onLetter = (letter: string) => {
        setLetter(letter);
        setContent(getByLetter(json as ILexiconItem[], letter))
    }

    // json.forEach(item => {
    //     console.log(Object.keys(item))
    //
    // })


    return (
        <div className={style.lexicon}>
            <div className={style.inner}>

                <h2 className={clsx(style.title, montserrat.className)}>
                    {translate(title, lang)}
                </h2>

                <SearchForm onSearch={onSearch}
                            onClear={onClear}
                />

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
                                <span>{_letter}</span>
                            </button>
                        ))
                    }
                </div>

                <div className={style.content}>
                    {
                        content.map((group, key) => (
                            <Group key={group.title + key}
                                   group={group}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
})

//========= GROUP =========//
interface IGroup {
    group: ILexiconItem
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