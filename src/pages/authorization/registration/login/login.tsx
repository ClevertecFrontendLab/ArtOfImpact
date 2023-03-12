import { AvailabilityNumber, EnglishSymbols, LoginValidation } from "../../../reg-ex/reg-ex"
import style from "../registration.module.scss"


export function Login({ register, errors, getFieldState }: any) {

    return (
        <div className={style.form__input}>
            <input type="text"
                className={style.input}
                {...register("username", {
                    required: "Поле не может быть пустым",
                    validate: {
                        CyrillicNumber: (value: string) => {
                            if (EnglishSymbols.test(value) === false && AvailabilityNumber.test(value) === true) {
                                return false
                            }
                            return true
                        },
                        Cyrillic: (value: string) => {
                            if (EnglishSymbols.test(value) === false && AvailabilityNumber.test(value) === false) {
                                return false
                            }
                            return true
                        },
                        rustext: (value: string) => LoginValidation.test(value),
                        number: (value: string) => AvailabilityNumber.test(value),
                    }
                })}
                name="username"
                required={true}
            />
            <label htmlFor="username" className={style.placeholder}>Логин</label>
            {errors?.username?.type === "required" && getFieldState("username").isDirty ? <div className={style.text} data-test-id="hint"><span>Используйте для логина латинский алфавит и цифры </span></div>
                : errors?.username?.type === "required" ? <div className={style.errorFull} data-test-id="hint"><span>Поле не может быть пустым</span></div>
                    : errors?.username?.type === "rustext" ? <div className={style.error} data-test-id="hint">Используйте для логина <span className={style.TextRed}>латинский алфавит</span> и <span className={style.TextRed}>цифры</span></div>
                        : errors?.username?.type === "CyrillicNumber" ? <div className={style.errorFull} data-test-id="hint"><span className={style.Text}>Используйте для логина</span> <span className={style.TextRed}>латинский алфавит</span><span className={style.Text}> и </span><span className={style.Text}>цифры</span></div>
                            : errors?.username?.type === "Cyrillic" ? <div className={style.error} data-test-id="hint">Используйте для логина <span className={style.TextRed}>латинский алфавит</span> и <span className={style.TextRed}>цифры</span></div>
                                : errors?.username?.type === "number" ? <div className={style.error} data-test-id="hint">Используйте для логина латинский алфавит и  <span className={style.TextRed}>цифры</span></div>
                                    : <div className={style.text} data-test-id="hint">Используйте для логина латинский алфавит и цифры</div>}
        </div>
    )
}