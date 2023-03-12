import { resetFetch, setStatusRegistration } from "../../../redux/slices/auth/auth";
import { useAppDispatch } from "../../../redux/store";
import AutoService from "../../http/auto-service";
import style from "../coincidence/coincidence.module.scss"


export function Error() {
    const dispatch = useAppDispatch();
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Данные не сохранились</span>
            <span className={style.container__subtitle}>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</span>
            <button type="button" className={style.container__btn}
                onClick={() => dispatch(setStatusRegistration("registration"))}>повторить</button>
        </div>
    )
}