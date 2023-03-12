/* eslint-disable react-hooks/exhaustive-deps */
import cn from "classnames"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { loginFetch, setStatusAuthorization, setStatusLoading } from "../../../redux/slices/auth/auth"
import style from "./login-password.module.scss"
import { useAppDispatch } from "../../../redux/store"
import { selectAuth } from "../../../redux/slices/auth/auth-selector"
import { Identifier } from "./identifier/identifier"
import { IdentifierPassword } from "./password/password"

interface ILoginPassword {
    identifier: string,
    password: string,
}

export function LoginPassword() {

    const dispatch = useAppDispatch()

    const { register, handleSubmit, setValue, watch, getFieldState, reset, formState: { errors, isValid } } = useForm<ILoginPassword>({
        mode: "all"
    })

    const navigate = useNavigate()

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || "/"

    const { token, invalidData } = useSelector(selectAuth)

    function Login({ identifier, password }: ILoginPassword) {
        dispatch(loginFetch({ identifier, password }))
        reset()
    }

    const watchFields = watch(["identifier", "password"])

    const onSubmit = (data: ILoginPassword) => {
        Login({ identifier: watchFields[0], password: watchFields[1] })
    };

    return (
        <div className={style.container}>
            <span className={style.container__title}>Вход в личный кабинет</span>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form} data-test-id="auth-form">
                <Identifier style={style} register={register} errors={errors} invalidData={invalidData}
                    watchFields={watchFields[0]} setValue={setValue} />
                <IdentifierPassword style={style} register={register} errors={errors} watchFields={watchFields}
                    invalidData={invalidData} />
                {invalidData ?
                    <div className={style.containerError}>
                        <span className={style.containerError__title} data-test-id="hint">Неверный логин или пароль!</span>
                        <span className={style.containerError__subtitle} onClick={() => navigate("/forgot-pass")} role="presentation">Восстановить?</span>
                    </div>
                    :
                    <span className={style.container__subtitle} onClick={() => navigate("/forgot-pass")} role="presentation">Забыли логин или пароль?</span>
                }
                <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}>вход</button>
                <div className={style.containerFooter}>
                    <span className={style.containerFooter__title}>Нет учётной записи?</span>
                    <span className={style.containerFooter__subtitle} role="presentation" onClick={() => navigate("/registration")}   >Регистрация</span>
                </div>
            </form>
        </div>
    )
}