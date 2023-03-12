import { useState } from "react"

export function Identifier({ style, register, errors, invalidData, watchFields, setValue }: any) {

    const [errorLength, setErrorLength] = useState<any>(null)

    return (
        <div className={style.form__input}>
            <input type="text"
                className={style.input}
                {...register("identifier", {
                    required: "Обезательнок поле для заполнения",
                })}
                required={true}
                name="identifier"
                onBlur={() => {
                    if (watchFields === undefined) {
                        setValue("identifier", "")
                        setErrorLength("length")
                    }
                }}
            />
            <label htmlFor="identifier" className={style.placeholder}>Логин</label>
            {errorLength === "length" && watchFields?.length < 1 ? <div className={style.form__subtitleError} data-test-id="hint"><span>Поле не может быть пустым</span></div>
                : invalidData ? <div className={style.form__subtitleError} data-test-id="hint" /> : <div className={style.form__subtitle} />}
        </div>
    )
}