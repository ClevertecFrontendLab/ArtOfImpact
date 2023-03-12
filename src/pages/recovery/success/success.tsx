import { useNavigate } from "react-router-dom"
import { setStatusRecovery } from "../../../redux/slices/auth/auth"
import { useAppDispatch } from "../../../redux/store"
import style from "./success.module.scss"


export function RecoverySuccess() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function Authorization() {
        dispatch(setStatusRecovery("email"))
        navigate("/auth")
    }

    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Новые данные сохранены</span>
            <span className={style.container__subtitle}>Зайдите в личный кабинет, используя свои логин и новый пароль</span>
            <button type="button" className={style.container__btn} onClick={() => Authorization()}>вход</button>
        </div>
    )
}