/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import cn from "classnames"
import style from "./content-aside.module.scss"
import { setActiveNumber } from "../../../../redux/slices/aside/aside-slice"
import { toggleBurger } from "../../../../redux/slices/header/header-slice"
import { contentFetch, filterFetch, setIsOpenMenu } from "../../../../redux/slices/content/content-slice"
import { selectContent } from "../../../../redux/slices/content/content-selector"
import { selectAside } from "../../../../redux/slices/aside/aside-selector"
import { selectHeader } from "../../../../redux/slices/header/header-selector"
import { useAppDispatch } from "../../../../redux/store"
import { Asides } from "../../../../redux/slices/aside/aside-type"

export function Aside() {

    const { asides, activeNumber } = useSelector(selectAside)

    const { isOpenMenu, countBooks, status } = useSelector(selectContent)

    const { burger } = useSelector(selectHeader)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const location = useLocation();

    const [width, setWidth] = useState(1400)

    window.addEventListener(`resize`, event => {
        setWidth(window.innerWidth)
    }, false);

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    const toggleMenuMode = (() => {
        if (status === "error") {
            dispatch(setIsOpenMenu(false))
        } else {
            dispatch(setIsOpenMenu(!isOpenMenu))
        }

    })

    const blockRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = ((event: Event) => {
            if (!blockRef.current) return;
            if ((event.target as HTMLSpanElement)?.id !== "burger" && !blockRef.current.contains(event.target as Document)) {
                dispatch(toggleBurger(false))
            }
        })

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [burger, dispatch])

    function activeDefault() {
        const token = localStorage.getItem("token")
        if (token !== null) {
            dispatch(setActiveNumber(0))
            dispatch(contentFetch({ token }))
            navigate(`/books/all`)
        }
    }

    function activeFilter(el: Asides) {
        const token = localStorage.getItem("token")
        if (token) {
            dispatch(setActiveNumber(el.id))
            dispatch(filterFetch({ name: el.name, token }))
            navigate(`/books/${el.path}`)
        }
    }
    function Exit() {
        localStorage.removeItem("token")
        navigate("/auth")
    }
    return (
        <div className={cn(style.container, { [style.active]: burger })} ref={blockRef} onClick={(event) => event.stopPropagation()}
            role="presentation" data-test-id='burger-navigation'>
            <Link to="/books/all" className={cn(style.link, { [style.active]: location.pathname === "/books/all" })}>
                <h2 className={cn(style.case, { [style.active]: location.pathname === "/books/all" })} onClick={() => (toggleMenuMode())}
                    role="presentation" data-test-id={width < 1000 ? 'burger-showcase' : 'navigation-showcase'}>Витрина книг</h2>
                {location.pathname === "/books/all" ?
                    <div className={cn(style.boxArrow, { [style.active]: !isOpenMenu })} onClick={() => (toggleMenuMode())} role="presentation">
                        <span className={cn(style.arrow, { [style.active]: !isOpenMenu })} /></div>
                    :
                    <div className={cn(style.boxArrowDisabled, { [style.active]: !isOpenMenu })} onClick={() => (toggleMenuMode())} role="presentation">
                        <span className={cn(style.arrowDisabled, { [style.active]: !isOpenMenu })} /></div>
                }
            </Link>
            <div className={cn(style.listContainer, { [style.visible]: !isOpenMenu })} >
                <div className={style.list} onClick={() => (dispatch(toggleBurger(false)))} role="presentation">
                    <h3 className={cn(style.list__text, { [style.active]: activeNumber === 0 })} onClick={() => (activeDefault())} role="presentation"
                        data-test-id={width < 1000 ? 'burger-books' : 'navigation-books'}>Все книги</h3>
                </div>
                {asides?.map((el, id: number) =>
                    <div className={style.list} onClick={() => (dispatch(toggleBurger(false)))} role="presentation" >
                        <h3 className={cn(style.list__text, { [style.active]: activeNumber === el.id })} onClick={() => (activeFilter(el))} role="presentation"
                            data-test-id={width < 1000 ? `burger-${el.path}` : `navigation-${el.path}`}>
                            {el.name}</h3>
                        <span data-test-id={width < 1000 ? `burger-book-count-for-${el.path}` : `navigation-book-count-for-${el.path}`} >{countBooks[id]}</span>
                    </div>
                )}
            </div>
            <Link to="/Rule" >
                <div className={cn(style.rule, { [style.active]: location.pathname === "/Rule" })} onClick={() => (dispatch(setIsOpenMenu(false)))} role="presentation"
                    data-test-id={width < 1000 ? 'burger-terms' : 'navigation-terms'}>
                    Правила пользования </div>
            </Link>
            <div>
                <div className={cn(style.contract, { [style.active]: location.pathname === "/Contract" })} onClick={() => (dispatch(setIsOpenMenu(false)))} role="presentation"
                    data-test-id={width < 1000 ? 'burger-contract' : 'navigation-contract'}>
                    <Link to="/Contract" > Договор оферты</Link>
                </div>
            </div>
            {width < 1000 &&
                <div className={style.user}>
                    <span className={style.user__title}>Профиль</span>
                    <span className={style.user__subtitle} onClick={() => Exit()} role="presentation" data-test-id="exit-button">Выход</span>
                </div>}
        </div>
    )
}