import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import cn from "classnames"
import style from './header.module.scss'
import logo from "../../photo/logo/logo.svg"
import user from "../../photo/icon/avatar.png"
import { toggleBurger } from "../../redux/slices/header/header-slice"
import { useAppDispatch } from "../../redux/store"
import { selectHeader } from "../../redux/slices/header/header-selector"



export function Header() {
    const [active, setActive] = useState(false)
    const { burger } = useSelector(selectHeader)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function Exit() {
        localStorage.removeItem("token")
        navigate("/auth")
    }

    return (
        <header className={style.container}>
            <div className={cn(style.burger, { [style.active]: burger })} id="burger" role="presentation" onClick={() => dispatch(toggleBurger(!burger))} data-test-id='button-burger'>
                <span id="burger" />
            </div>
            <Link to="/books/all" ><img src={logo} alt="logo" className={style.logo} /></Link>
            <h1 className={style.title}>Библиотека</h1>
            <div className={style.user} onClick={() => setActive(!active)} role="presentation">
                <span>Привет, Иван!</span>
                <img src={user} alt="user" />
            </div>
            {active && <div className={style.menu}>
                <span className={style.menu__text}>Профиль</span>
                <span className={style.menu__text} role="presentation" onClick={() => Exit()}>Выход</span>
            </div>}
        </header >
    )
} 