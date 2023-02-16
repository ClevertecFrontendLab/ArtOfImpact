/* eslint-disable consistent-return */
import { useEffect, useRef, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import cn from "classnames"
import style from "./content-aside.module.css"
import { asideFetch } from "../../../../redux/slices/aside-slice"
import { toggleBurger } from "../../../../redux/slices/header-slice"
import { contentFetch, filterFetch, setIsOpenMenu } from "../../../../redux/slices/content-slice"



export function Aside() {
    const aside = useSelector((state) => state.aside.asides)

    const isOpenMenu = useSelector((state) => state.content.isOpenMenu)
    const countBooks = useSelector((state) => state.content.countBooks)
    const statusBooks = useSelector((state) => state.content.status)

    const statusBurger = useSelector((state) => state.header.burger)

    const dispatch = useDispatch();

    const location = useLocation();

    const [width, setWidth] = useState(1400)

    window.addEventListener(`resize`, event => {
        setWidth(window.innerWidth)
    }, false);

    useEffect(() => {
        setWidth(window.innerWidth)
        dispatch(asideFetch())
    }, [dispatch])

    const [isActive, setIsActive] = useState(0)

    const toggleMenuMode = (() => {
        if (statusBooks === "error") {
            dispatch(setIsOpenMenu(false))
        } else {
            dispatch(setIsOpenMenu(!isOpenMenu))
        }
    })

    const blockRef = useRef(null)

    useEffect(() => {
        const handleClick = ((e) => {
            if (!blockRef.current) return;
            if (e.target.id !== "burger" && !blockRef.current.contains(e.target)) {
                dispatch(toggleBurger(false))
            }
        })

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [statusBurger, dispatch])

    function activeDefault() {
        setIsActive(0)
        dispatch(contentFetch())
    }

    function activeFilter(el) {
        setIsActive(el.id)
        dispatch(filterFetch(el))
    }

    return (
        <div className={cn(style.container, { [style.active]: statusBurger })} ref={blockRef} onClick={(event) => event.stopPropagation()} role="presentation" data-test-id='burger-navigation'>
            <Link to="/" className={cn(style.link, { [style.active]: location.pathname === "/" })}>
                <h2 className={cn(style.case, { [style.active]: location.pathname === "/" })} onClick={() => (toggleMenuMode())} role="presentation" data-test-id={width < 1000 ? 'burger-showcase' : 'navigation-showcase'}>Витрина книг</h2>
                {location.pathname === "/" ?
                    <div className={cn(style.boxArrow, { [style.active]: !isOpenMenu })} onClick={() => (toggleMenuMode())} role="presentation">
                        <span className={cn(style.arrow, { [style.active]: !isOpenMenu })} /></div>
                    :
                    <div className={cn(style.boxArrowDisabled, { [style.active]: !isOpenMenu })} onClick={() => (toggleMenuMode())} role="presentation">
                        <span className={cn(style.arrowDisabled, { [style.active]: !isOpenMenu })} /></div>
                }
            </Link>
            <div className={cn(style.listContainer, { [style.visible]: !isOpenMenu })} >
                <div className={style.list} onClick={() => (dispatch(toggleBurger(false)))} role="presentation" data-test-id={width < 1000 ? 'burger-books' : 'navigation-books'}>
                    <h3 className={cn(style.list__text, { [style.active]: isActive === 0 })} onClick={() => (activeDefault())} role="presentation">Все книги</h3>
                </div>
                {aside?.map((el, id) =>
                    <div className={style.list} onClick={() => (dispatch(toggleBurger(false)))} role="presentation" >
                        <h3 className={cn(style.list__text, { [style.active]: isActive === el.id })} onClick={() => (activeFilter(el))} role="presentation">{el.name}</h3>
                        <span>{countBooks[id].count}</span>
                    </div>
                )}
            </div>
            <Link to="/Rule" >
                <div className={cn(style.rule, { [style.active]: location.pathname === "/Rule" })} onClick={() => (dispatch(setIsOpenMenu(false)))} role="presentation" data-test-id={width < 1000 ? 'burger-terms' : 'navigation-terms'}>
                    Правила пользования </div>
            </Link>
            <div>
                <div className={cn(style.contract, { [style.active]: location.pathname === "/Contract" })} onClick={() => (dispatch(setIsOpenMenu(false)))} role="presentation" data-test-id={width < 1000 ? 'burger-contract' : 'navigation-contract'}>
                    <Link to="/Contract" > Договор оферты</Link>
                </div>
            </div>
            {width < 1000 &&
                <div className={style.user}>
                    <span className={style.user__title}>Профиль</span>
                    <span className={style.user__subtitle}>Выход</span>
                </div>}
        </div>
    )
}