import style from "../registration.module.scss"



export function Surname({ register, errors }: any) {
    return (
        <div className={style.form__input}>
            <input type="text" id="Surname"
                className={style.input}
                {...register("lastName", {
                    required: "Поле не может быть пустым",
                    minLength: 1,
                })}
                name="lastName"
                required={true}
            />
            <label htmlFor="Surname" className={style.placeholder}>Фамилия</label>
            {errors?.lastName && <div className={style.error} ><span className={style.TextRed} data-test-id="hint">{errors.lastName.message}</span></div>}
        </div>
    )
}