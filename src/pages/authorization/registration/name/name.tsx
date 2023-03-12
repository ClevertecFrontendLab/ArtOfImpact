import style from "../registration.module.scss"

export function Name({ register, errors }: any) {

    return (
        <div className={style.form__input}>
            <input type="text" id="Name"
                className={style.input}
                {...register("firstName", {
                    required: "Поле не может быть пустым",
                    minLength: 1,
                })}
                name="firstName"
                required={true}
            />
            <label htmlFor="Name" className={style.placeholder}>Имя</label>
            {errors?.firstName && <div className={style.error} ><span className={style.TextRed} data-test-id="hint">{errors.firstName.message}</span></div>}
        </div>
    )
}