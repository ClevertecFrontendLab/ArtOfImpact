import { useNavigate } from "react-router-dom"
import style from "./success.module.scss"

export function Success() {
    const navigate = useNavigate()
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Регистрация успешна</span>
            <span className={style.container__subtitle}>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</span>
            <button type="button" className={style.container__btn} onClick={() => navigate("/auth")}>вход</button>
        </div>
    )
}