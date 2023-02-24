import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import style from "./content-header.module.scss"
import row_active from "../../../../photo/icon/row-active.svg"
import colum_inactive from "../../../../photo/icon/colum-inactive.svg"
import Searchs from "../../../../photo/icon/search.svg"
import Searchs_focus from "../../../../photo/icon/search_focus.svg"
import Sort from "../../../../photo/icon/sort.svg"
import Sort_less from "../../../../photo/icon/sort_less.svg"
import row_inactive from "../../../../photo/icon/row-inactive.svg"
import colum_active from "../../../../photo/icon/colum-active.svg"
import exit from "../../../../photo/icon/exit.svg"
import { setSearch, setSort } from "../../../../redux/slices/content/content-slice"
import { selectContent } from "../../../../redux/slices/content/content-selector"




type IButton = {
    isButton: boolean,
    setIsButton: React.Dispatch<React.SetStateAction<boolean>>,
}

export function ContentHeader({ isButton, setIsButton }: IButton) {
    const dispatch = useDispatch()
    const [isSearch, setIsSearch] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const { sort, search } = useSelector(selectContent)
    const inputRef = useRef<HTMLInputElement>(null)

    function clickSort() {
        dispatch(setSort(!sort))

    }
    const onChangeSearch = (event: string) => {
        dispatch(setSearch(event))
    }

    return (
        <div className={style.container} >
            <div className={style.search}>
                <div className={cn(style.searchBox, { [style.visible]: isSearch })} >
                    {isFocus ? <img src={Searchs_focus} alt="search" className={cn(style.searchBox__img, { [style.hidden]: isSearch })} />
                        : <img src={Searchs} alt="search" className={cn(style.searchBox__img, { [style.hidden]: isSearch })} />}
                    <input placeholder="Поиск книги или автора…" className={style.searchBox__write} ref={inputRef} value={search} data-test-id="input-search"
                        onChange={(event) => onChangeSearch(event.target.value)} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
                    <img src={exit} alt="exit-search" className={style.searchBox__exit} onClick={() => (setIsSearch(false))} role="presentation" data-test-id='button-search-close' />
                </div>
                <div className={style.searchBox} onClick={() => clickSort()} role="presentation" data-test-id='sort-rating-button'>
                    {sort ? <img src={Sort} alt="sort" className={style.searchBox__img} /> :
                        <img src={Sort_less} alt="sort" className={style.searchBox__img} />
                    }
                    <button type="button" className={style.searchBox__sort} >По рейтингу</button>
                </div>
                <div className={cn(style.searchSmallBox, { [style.hidden]: isSearch })}>
                    <img className={style.searchSmallBox__img} src={Searchs} alt="search" onClick={() => (setIsSearch(true))} role="presentation" data-test-id='button-search-open' />
                </div>
                <div className={cn(style.searchSmallBox, { [style.hidden]: isSearch })}>
                    <img className={style.searchSmallBox__img} src={Sort} alt="sort" />
                </div>
            </div>
            <div className={cn(style.location, { [style.hidden]: isSearch })}>
                {isButton === true ?
                    <>
                        <div className={style.locationBox} role="presentation" onClick={() => setIsButton(true)} data-test-id='button-menu-view-window'>
                            <img className={style.locationBox__img} src={row_active} alt="row-active" />
                        </div>
                        <div className={style.locationBoxInactive} role="presentation" onClick={() => setIsButton(false)} data-test-id='button-menu-view-list'>
                            <img className={style.locationBox__img} src={colum_inactive} alt="colum-inactive" />
                        </div>
                    </>
                    :
                    <>
                        <div className={style.locationBoxInactive} role="presentation" onClick={() => setIsButton(true)} data-test-id='button-menu-view-window'>
                            <img className={style.locationBox__img} src={row_inactive} alt="row-inactive" />
                        </div>
                        <div className={style.locationBox} role="presentation" onClick={() => setIsButton(false)} data-test-id='button-menu-view-list'>
                            <img className={style.locationBox__img} src={colum_active} alt="colum-active" />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}