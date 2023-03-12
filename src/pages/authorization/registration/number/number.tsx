import { Controller } from "react-hook-form"
import MaskedInput from 'react-text-mask';
import style from "../registration.module.scss"

export function Number({ control, errors }: any) {

    return (
        <div className={style.form__input}>
            <Controller control={control} name="phone"
                rules={
                    {
                        required: "Поле не может быть пустым",
                        pattern: /^(\+375|80) [(](29|25|44|33)[)] (\d{3})-(\d{2})-(\d{2})$/,
                    }
                }
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <>
                        <MaskedInput className={style.input} id="Number"
                            mask={["+", "3", "7", "5", " ", "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                            value={value}
                            keepCharPositions={true}
                            placeholderChar="x"
                            onChange={(newValue) => onChange(newValue)}
                            onBlur={onBlur}
                            type="text"
                            required={true}
                            name="phone"
                        />
                        <label htmlFor="Number" className={style.placeholder}>Номер телефона</label>
                        {errors.phone ? <div className={style.errorFull} data-test-id="hint"><span>{errors.phone.message ? errors.phone.message : "В формате +375 (xx) xxx-xx-xx"}</span></div>
                            : <div className={style.text} data-test-id="hint"><span>В формате +375 (xx) xxx-xx-xx</span></div>}
                    </>
                } />
        </div>
    )
}