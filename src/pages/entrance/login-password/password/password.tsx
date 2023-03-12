import { useState } from "react"
import { Eye } from "../eye/eye";


export function IdentifierPassword({ style, register, watchFields, errors, invalidData }: any) {

    const [passShow, setPassShow] = useState(true)
    return (
        <div className={style.form__input}>
            <input type={passShow ? "password" : "text"} id="Password"
                className={style.input}
                {...register("password", {
                    required: "Обезательнок поле для заполнения",
                })}
                required={true}
            />
            {watchFields[1]?.length > 0 && <Eye passShow={passShow} setPassShow={setPassShow} style={style} />}
            <label htmlFor="Password" className={style.placeholder}>Пароль</label>
            {errors?.password ? <div className={style.form__subtitleError} data-test-id="hint" ><span>Поле не может быть пустым</span></div> :
                invalidData ? <div className={style.form__subtitleError} data-test-id="hint" /> : <div className={style.form__subtitle} />}
        </div>
    )
}