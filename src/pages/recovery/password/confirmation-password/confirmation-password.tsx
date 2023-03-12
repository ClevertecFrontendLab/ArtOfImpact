import { Eye } from "../../../entrance/login-password/eye/eye"


export function ConfirmationPassword({ style, passShowAlso, setPassShowAlso, register, validateConfirmation, setValidateConfirmation, watchFields, setError }: any) {
    return (
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
            <Eye passShow={passShowAlso} setPassShow={setPassShowAlso} style={style.EyeAlso} />
            <label htmlFor="passwordConfirmation" className={style.placeholder}>Пароль</label>
            {validateConfirmation === "length" ? <div className={style.errorFull}><span className={style.TextRed} data-test-id="hint">Поле не может быть пустым</span></div>
                : validateConfirmation === "coincidences" ? <div className={style.errorFull}><span className={style.TextRed} data-test-id="hint">Пароли не совпадают</span></div> : <div className={style.text} />}
        </div>
    )
}