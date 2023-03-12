import { useState } from "react"
import CheckCircle from "../../../../photo/icon/CheckCircle.svg"
import { Eye } from "../../../entrance/login-password/eye/eye"
import { AvailabilityNumber, PasswordLength, Uppercase } from "../../../reg-ex/reg-ex"


export function RecPassword({ register, errors, getFieldState, watchFields, style, setValue }: any) {

    const [passShow, setPassShow] = useState(true)

    const [errorLength, setErrorLength] = useState("")

    return (
        <div className={style.form__input}>
            <input type={passShow ? "password" : "text"} id="Password"
                className={style.input}
                {...register("password", {
                    required: "Поле не может быть пустым",
                    validate: {
                        zeroTrue: (value: string) => {
                            if (PasswordLength.test(value) === false && AvailabilityNumber.test(value) === false && !Uppercase.test(value) === false) {
                                return false
                            }
                            return true
                        },
                        UppercaseAndNumber: (value: string) => {
                            if (PasswordLength.test(value) === true && AvailabilityNumber.test(value) === false && !Uppercase.test(value) === false) {
                                return false
                            }
                            return true
                        },
                        net8andNumber: (value: string) => {
                            if (PasswordLength.test(value) === false && AvailabilityNumber.test(value) === false && !Uppercase.test(value) === true) {
                                return false
                            }
                            return true
                        },
                        net8andUppercase: (value: string) => {
                            if (PasswordLength.test(value) === false && AvailabilityNumber.test(value) === true && !Uppercase.test(value) === false) {
                                return false
                            }
                            return true
                        },
                        length: (value: string) => PasswordLength.test(value) ? true : false,
                        number: (value: string) => AvailabilityNumber.test(value),
                        uppercase: (value: string) => !Uppercase.test(value),
                    }
                })}
                name="password"
                onBlur={() => {
                    if (watchFields === undefined) {
                        setValue("password", "")
                        setErrorLength("length")
                    }
                }}
                required={true}
            />
            {errors.password === undefined && watchFields?.length > 0 && <img src={CheckCircle} alt="CheckCircle" className={style.checkmark} role="presentation" data-test-id="checkmark" />}
            {watchFields?.length > 0 && <Eye passShow={passShow} setPassShow={setPassShow} style={style.Eye} />}
            <label htmlFor="Password" className={style.placeholder}>Пароль</label>
            {errors?.password?.type === "required" && getFieldState("password").isDirty ? <div className={style.text} data-test-id="hint"><span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span></div>
                : errorLength === "length" && watchFields?.length < 1 ? <div className={style.errorFull} data-test-id="hint"><span className={style.TextRed}>Поле не может быть пустым</span></div>
                    : errors?.password?.type === "zeroTrue" ? <div className={style.error} data-test-id="hint">Пароль <span className={style.TextRed}>не менее 8 символов</span>, с <span className={style.TextRed}>заглавной буквой</span> и <span className={style.TextRed}>цифрой</span></div>
                        : errors?.password?.type === "net8andNumber" ? <div className={style.error} data-test-id="hint">Пароль <span className={style.TextRed}>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span className={style.TextRed}>цифрой</span></div>
                            : errors?.password?.type === "UppercaseAndNumber" ? <div className={style.error} data-test-id="hint">Пароль не <span>менее 8 символов</span>, с <span className={style.TextRed}>заглавной буквой</span> и <span className={style.TextRed}>цифрой</span></div>
                                : errors?.password?.type === "net8andUppercase" ? <div className={style.error} data-test-id="hint">Пароль <span className={style.TextRed}>не менее 8 символов</span>, с <span className={style.TextRed}>заглавной буквой</span> и <span>цифрой</span></div>
                                    : errors?.password?.type === "length" ? <div className={style.error} data-test-id="hint">Пароль <span className={style.TextRed}>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span></div>
                                        : errors?.password?.type === "number" ? <div className={style.error} data-test-id="hint">Пароль не <span>менее 8 символов</span>, с <span>заглавной буквой</span> и <span className={style.TextRed}>цифрой</span></div>
                                            : errors?.password?.type === "uppercase" ? <div className={style.error} data-test-id="hint">Пароль <span>не менее 8 символов</span>, с <span className={style.TextRed}>заглавной буквой</span> и <span>цифрой</span></div>
                                                : <div className={style.text} data-test-id="hint"><span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span></div>}
        </div>
    )
}
