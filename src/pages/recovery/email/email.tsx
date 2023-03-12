/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import cn from "classnames"
import style from "./email.module.scss"
import arrow from '../../../photo/icon/arrow_back.svg'
import { useAppDispatch } from "../../../redux/store"
import { emailFetch, setStatusLoading, setStatusRecovery } from "../../../redux/slices/auth/auth"
import { Email } from "../../authorization/registration/email/email"
import { selectAuth } from "../../../redux/slices/auth/auth-selector"



export function RecoveryEmail() {

    const { register, handleSubmit, watch, formState: { errors, isValid } }: any = useForm({
        mode: "all",
    })
    const watchFields = watch("email")

    const dispatch = useAppDispatch()
    const { errorValueEmail } = useSelector(selectAuth)

    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        PasswordReset(watchFields)
    };

    async function PasswordReset(email: string) {
        dispatch(emailFetch({ email }))
    }
    const [errorLength, setErrorLength] = useState(null)

    return (
        <div className={style.container}>
            <div className={style.boxBack}>
                <div className={style.back} onClick={() => navigate("/auth")} role="presentation">
                    <img src={arrow} alt="back" className={style.back__img} />
                    <span className={style.back__text}>вход в личный кабинет</span>
                </div>
            </div>
            <span className={style.container__title}>Восстановление пароля</span>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form} data-test-id="send-email-form">
                <div className={style.form__input}>
                    <Email register={register} style={style} watchFields={watchFields} setErrorLength={setErrorLength} />
                    {errorLength === "length" && watchFields.length < 1 ? <div className={style.error} data-test-id="hint"><span className={style.TextRed}>Поле не может быть пустым</span></div> :
                        errors?.email ? <div className={style.error} data-test-id="hint"><span className={style.TextRed}>{errors.email.message}</span></div> :
                            errors.email === undefined && errorValueEmail?.length > 0 ? <div className={style.error} data-test-id="hint"><span>{errorValueEmail}</span></div> : null}
                </div>
                <span className={style.container__subtitle}>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
                <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}>восстановить</button>
                <div className={style.containerFooter}>
                    <span className={style.containerFooter__title}>Нет учётной записи?</span>
                    <span className={style.containerFooter__subtitle} onClick={() => navigate("/registration")} role="presentation">Регистрация</span>
                </div>
            </form>
        </div>
    )
}