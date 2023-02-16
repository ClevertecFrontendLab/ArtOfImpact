import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import style from './header.module.css'
import logo from "../../photo/logo/logo.svg"
import user from "../../photo/icon/avatar.svg"
import { toggleBurger } from "../../redux/slices/header-slice"



export function Header() {

    const statusBurger = useSelector((state) => state.header.burger)
    const dispatch = useDispatch()

    return (
        <header className={style.container}>
            <div className={cn(style.burger, { [style.active]: statusBurger })} id="burger" alt="burger" role="presentation" onClick={() => dispatch(toggleBurger(!statusBurger))} data-test-id='button-burger'>
                <span id="burger" />
            </div>
            <NavLink to="/" ><img src={logo} alt="logo" className={style.logo} /></NavLink>
            <h1 className={style.title}>Библиотека</h1>
            <div className={style.user}>
                <span>Привет, Иван!</span>
                <img src={user} alt="user" />
            </div>
        </header >
    )
} 