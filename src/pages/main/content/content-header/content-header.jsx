import { useState } from "react"
import cn from "classnames"
import style from "./content-header.module.css"
import row_active from "../../../../photo/icon/row-active.svg"
import colum_inactive from "../../../../photo/icon/colum-inactive.svg"
import search from "../../../../photo/icon/search.svg"
import sort from "../../../../photo/icon/sort.svg"
import row_inactive from "../../../../photo/icon/row-inactive.svg"
import colum_active from "../../../../photo/icon/colum-active.svg"
import exit from "../../../../photo/icon/exit.svg"



export function ContentHeader({ isButton, setIsButton }) {

    const [isSearch, setIsSearch] = useState(false)

    return (
        <div className={style.container}>
            <div className={style.search}>
                <div className={cn(style.searchBox, { [style.visible]: isSearch })} data-test-id='input-search' >
                    <img src={search} alt="search" className={cn(style.searchBox__img, { [style.hidden]: isSearch })} />
                    <input placeholder="Поиск книги или автора..." className={style.searchBox__write} />
                    <img src={exit} alt="exit-search" className={style.searchBox__exit} onClick={() => (setIsSearch(false))} role="presentation" data-test-id='button-search-close' />
                </div>
                <div className={style.searchBox}>
                    <img src={sort} alt="sort" className={style.searchBox__img} />
                    <button type="button" className={style.searchBox__sort}>По рейтингу</button>
                </div>
                <div className={cn(style.searchSmallBox, { [style.hidden]: isSearch })}>
                    <img className={style.searchSmallBox__img} src={search} alt="search" onClick={() => (setIsSearch(true))} role="presentation" data-test-id='button-search-open' />
                </div>
                <div className={cn(style.searchSmallBox, { [style.hidden]: isSearch })}>
                    <img className={style.searchSmallBox__img} src={sort} alt="sort" />
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