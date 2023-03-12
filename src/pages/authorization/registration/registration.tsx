import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import cn from "classnames"
import style from "./registration.module.scss"
import { Login } from "./login/login";
import { Password } from "./password/password";
import { Name } from "./name/name";
import { Surname } from "./surname/surname";
import { Number } from "./number/number";
import { Email } from "./email/email"
import { useAppDispatch } from "../../../redux/store"
import { registrationFetch, setStatusLoading, setStatusRegistration } from "../../../redux/slices/auth/auth"
import AutoService from "../../http/auto-service"


export function Registration() {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, watch, control, setValue, getFieldState, reset, formState: { errors, isValid, } }: any = useForm({
        mode: "all"
    })
    const navigate = useNavigate()
    const [numberSlide, setNumberSlide] = useState(1)

    const watchFields = watch(["username", "password", "firstName", "lastName", "phone", "email"])

    const onSubmit = (data: any) => {
        setNumberSlide(numberSlide + 1)
        if (numberSlide >= 3) {
            Registr(watchFields[0], watchFields[1], watchFields[2], watchFields[3], watchFields[4], watchFields[5],)
        }
    };

    async function Registr(username: string, password: string, firstName: string, lastName: string, phone: string, email: string) {
        dispatch(registrationFetch({ email, username, password, firstName, lastName, phone }))
    }
    const [errorLength, setErrorLength] = useState(null)
    return (
        <div className={style.container}>
            <span className={style.container__title}>Регистрация</span>
            <span className={style.container__subtitle}>{numberSlide} шаг из 3 </span>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form} data-test-id="register-form">
                {numberSlide === 1 ?
                    <>
                        <Login register={register} errors={errors} getFieldState={getFieldState} />
                        <Password register={register} errors={errors} getFieldState={getFieldState} watchFields={watchFields[1]} style={style} />
                    </>
                    : numberSlide === 2 ?
                        <>
                            <Name register={register} errors={errors} />
                            <Surname register={register} errors={errors} />
                        </>
                        :
                        <>
                            <Number control={control} errors={errors} />
                            <div className={style.form__input}>
                                <Email register={register} style={style} setErrorLength={setErrorLength} />
                                {errorLength === "length" && watchFields[5].length < 1 ? <div className={style.errorFull} data-test-id="hint"><span className={style.TextRed}>Поле не может быть пустым</span></div> :
                                    errors?.email ? <div className={style.errorFull} data-test-id="hint"><span className={style.TextRed}>{errors.email.message}</span></div>
                                        : <div className={style.text}>Введите корректный e-mail</div>}
                            </div>
                        </>
                }
                {numberSlide >= 3 ? <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}>зарегистрироваться</button> :
                    numberSlide === 2 ? <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}>последний шаг</button> :
                        <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}>следующий шаг</button>}
                <div className={style.containerFooter}>
                    <span className={style.containerFooter__title}>Есть учётная запись?</span>
                    <span className={style.containerFooter__subtitle} onClick={() => navigate("/auth")} role="presentation">Войти</span>
                </div>
            </form>
        </div>
    )
}