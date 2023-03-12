
export function Email({ register, style, watchFields, setErrorLength }: any) {

    console.log(watchFields)

    return (
        <>
            <input type="text" id="Email"
                className={style.input}
                {...register("email", {
                    required: "Поле не может быть пустым",
                    pattern: {
                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        message: "Введите корректный e-mail"
                    }
                })}
                name="email"
                onBlur={() => {
                    if (watchFields === undefined) {
                        setErrorLength("length")
                        console.log("length")
                    } else if (watchFields.length > 0 && /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(watchFields) === false) {
                        setErrorLength("regEmail")
                        console.log("regEmail")
                    }
                }}
                required={true}
            />
            <label htmlFor="Email" className={style.placeholder}>E-mail</label>
        </>
    )
}