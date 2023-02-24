import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import cn from "classnames"
import style from './header.module.scss'
import logo from "../../photo/logo/logo.svg"
import user from "../../photo/icon/avatar.png"
import { toggleBurger } from "../../redux/slices/header/header-slice"
import { useAppDispatch } from "../../redux/store"
import { selectHeader } from "../../redux/slices/header/header-selector"



export function Header() {

    const { burger } = useSelector(selectHeader)
    const dispatch = useAppDispatch()

    return (
        <header className={style.container}>
            <div className={cn(style.burger, { [style.active]: burger })} id="burger" role="presentation" onClick={() => dispatch(toggleBurger(!burger))} data-test-id='button-burger'>
                <span id="burger" />
            </div>
            <NavLink to="/books/all" ><img src={logo} alt="logo" className={style.logo} /></NavLink>
            <h1 className={style.title}>Библиотека</h1>
            <div className={style.user}>
                <span>Привет, Иван!</span>
                <img src={user} alt="user" />
            </div>
        </header >
    )
} 