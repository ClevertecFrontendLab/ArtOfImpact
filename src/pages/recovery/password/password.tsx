import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import cn from "classnames"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAppDispatch } from "../../../redux/store";
import style from "./password.module.scss"
import { resetFetch } from "../../../redux/slices/auth/auth"
import { RecPassword } from "./recovery-password/recovery-password";
import { Eye } from "../../entrance/login-password/eye/eye";
import { ConfirmationPassword } from "./confirmation-password/confirmation-password";

interface IRecoveryPassword {
    password: string,
    passwordConfirmation: string,
    code: string
}

export function RecoveryPassword() {

    const { register, handleSubmit, getFieldState, watch, setValue, reset, setError, formState: { errors, isValid } } = useForm<IRecoveryPassword>({
        mode: "all"
    })
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const Code = searchParams.get("code") || "";
    const CodeBe = searchParams.has("code")

    const watchFields = watch(["password", "passwordConfirmation"])

    const [passShowAlso, setPassShowAlso] = useState(true)

    async function PasswordRecovery(password: string, passwordConfirmation: string, code: string) {
        dispatch(resetFetch({ password, passwordConfirmation, code }))
    }

    const onSubmit = (data: IRecoveryPassword) => {
        PasswordRecovery(watchFields[0], watchFields[1], Code)
    };

    const [validateConfirmation, setValidateConfirmation] = useState("")

    return (
        <div className={style.container}>
            <span className={style.container__title}>Восстановление пароля</span>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form} data-test-id="reset-password-form">
                <RecPassword register={register} errors={errors} getFieldState={getFieldState} watchFields={watch("password")}
                    setValue={setValue} style={style} />
                <ConfirmationPassword register={register} style={style} passShowAlso={passShowAlso} setPassShowAlso={setPassShowAlso}
                    validateConfirmation={validateConfirmation} setValidateConfirmation={setValidateConfirmation} watchFields={watchFields}
                    setError={setError} />
                <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}> сохранить изменения</button>
            </form>
            <div className={style.containerFooter}>
                <span className={style.containerFooter__title}>После сохранения войдите в библиотеку, используя новый пароль</span>
            </div>
        </div>
    )
}