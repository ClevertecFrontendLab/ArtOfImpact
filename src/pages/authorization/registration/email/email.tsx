import { EmailValidation } from "../../../reg-ex/reg-ex"

export function Email({ register, style, watchFields, setErrorLength }: any) {

    return (
        <>
            <input type="text" id="Email"
                className={style.input}
                {...register("email", {
                    required: "Поле не может быть пустым",
                    pattern: {
                        value: EmailValidation,
                        message: "Введите корректный e-mail"
                    }
                })}
                name="email"
                onBlur={() => {
                    if (watchFields === undefined) {
                        setErrorLength("length")
                    } else if (watchFields.length > 0 && EmailValidation.test(watchFields) === false) {
                        setErrorLength("regEmail")
                    }
                }}
                required={true}
            />
            <label htmlFor="Email" className={style.placeholder}>E-mail</label>
        </>
    )
}