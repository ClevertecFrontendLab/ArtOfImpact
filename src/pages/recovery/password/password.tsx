import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import cn from "classnames"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAppDispatch } from "../../../redux/store";
import style from "./password.module.scss"
import { EyeAlso } from "../../entrance/login-password/eye/eye-also"
import { resetFetch } from "../../../redux/slices/auth/auth"
import { RecPassword } from "./recovery-password/recovery-password";



export function RecoveryPassword() {

    const { register, handleSubmit, getFieldState, watch, setValue, reset, setError, formState: { errors, isValid } } = useForm({
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

    const onSubmit = (data: any) => {
        PasswordRecovery(watchFields[0], watchFields[1], Code)
    };

    const [validateConfirmation, setValidateConfirmation] = useState("")

    return (
        <div className={style.container}>
            <span className={style.container__title}>Восстановление пароля</span>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form} data-test-id="reset-password-form">
                <RecPassword register={register} errors={errors} getFieldState={getFieldState} watchFields={watch("password")}
                    setValue={setValue} style={style} />
                <div className={style.form__input}>
                    <input type={passShowAlso ? "password" : "text"} id="PasswordAlso"
                        className={style.input}
                        {...register("passwordConfirmation", {
                            required: "Обезательнок поле для заполнения",
                            minLength: 8,
                        })}
                        onFocus={() => {
                            setValidateConfirmation("")
                        }}
                        onBlur={() => {
                            if (watchFields[1]?.length < 1) {
                                setValidateConfirmation("length")
                            } else if (watchFields[0] !== watchFields[1]) {
                                setValidateConfirmation("coincidences")
                            } else if (watchFields[1]?.length < 8) {
                                setError("passwordConfirmation", { type: "minLength" })
                            }
                        }}
                        required={true}
                        name="passwordConfirmation"
                    />
                    <EyeAlso passShowAlso={passShowAlso} setPassShowAlso={setPassShowAlso} style={style} />
                    <label htmlFor="passwordConfirmation" className={style.placeholder}>Пароль</label>
                    {validateConfirmation === "length" ? <div className={style.errorFull}><span className={style.TextRed} data-test-id="hint">Поле не может быть пустым</span></div>
                        : validateConfirmation === "coincidences" ? <div className={style.errorFull}><span className={style.TextRed} data-test-id="hint">Пароли не совпадают</span></div> : <div className={style.text} />}
                </div>
                <button type="submit" className={cn(style.form__button, { [style.disabled]: !isValid })} disabled={!isValid}> сохранить изменения</button>
            </form>
            <div className={style.containerFooter}>
                <span className={style.containerFooter__title}>После сохранения войдите в библиотеку, используя новый пароль</span>
            </div>
        </div>
    )
}