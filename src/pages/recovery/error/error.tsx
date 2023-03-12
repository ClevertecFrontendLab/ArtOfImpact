import { setStatusRecovery } from "../../../redux/slices/auth/auth"
import { useAppDispatch } from "../../../redux/store"
import style from "./error.module.scss"

export function RecoveryError() {

    const dispatch = useAppDispatch()
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Данные не сохранились</span>
            <span className={style.container__subtitle}>Что-то пошло не так. Попробуйте ещё раз</span>
            <button type="button" className={style.container__btn} onClick={() => dispatch(setStatusRecovery("password"))}>повторить</button>
        </div>
    )
}