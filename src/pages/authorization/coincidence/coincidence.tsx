import { setStatusRegistration } from "../../../redux/slices/auth/auth"
import { useAppDispatch } from "../../../redux/store"
import style from "./coincidence.module.scss"


export function Coincidence() {
    const dispatch = useAppDispatch()
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Данные не сохранились</span>
            <span className={style.container__subtitle}>Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.</span>
            <button type="button" className={style.container__btn} onClick={() => dispatch(setStatusRegistration("registration"))}>назад к регистрации</button>
        </div>
    )
}