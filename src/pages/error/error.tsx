import cn from "classnames"
import { useState } from "react"
import style from "./error.module.scss"
import error from "../../photo/icon/error_icon.svg"
import error_exit from "../../photo/icon/error_exit.svg"


export function Error() {

    const [isExit, setIsExit] = useState(true)

    return (
        <div className={cn(style.error, { [style.hidden]: isExit !== true })} data-test-id="error">
            <img src={error} alt="icon" className={style.error__icon} />
            <span className={style.error__text}>Что-то пошло не так. Обновите страницу через некоторое время.</span>
            <img src={error_exit} alt="icon" className={style.error__exit} onClick={(() => setIsExit(false))} role="presentation" />
        </div>
    )
}