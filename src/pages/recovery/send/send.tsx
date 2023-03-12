import style from "./send.module.scss"

export function RecoverySend() {

    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>Письмо выслано</span>
            <span className={style.container__subtitle}> Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</span>
        </div>
    )
}