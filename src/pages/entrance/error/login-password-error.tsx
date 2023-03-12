import { useDispatch } from "react-redux"
import { setStatusAuthorization } from "../../../redux/slices/auth/auth"
import style from "./login-password-error.module.scss"


export function LoginPasswordError() {
    const dispatch = useDispatch()
    function Login() {
        dispatch(setStatusAuthorization("login"))
    }
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Вход не выполнен</span>
            <span className={style.container__subtitle}>Что-то пошло не так. Попробуйте ещё раз</span>
            <button type="button" className={style.container__btn} onClick={() => Login()}>повторить</button>
        </div>
    )
}