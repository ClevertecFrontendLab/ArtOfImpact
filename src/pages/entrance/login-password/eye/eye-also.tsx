import EyeOpen from "../../../../photo/icon/Eye.svg"
import EyeClosed from "../../../../photo/icon/EyeClosed.svg"
import style from "./eye.module.scss"

export function EyeAlso({ passShowAlso, setPassShowAlso, style }: any) {
    return (
        passShowAlso ? <img src={EyeClosed} alt="EyeClosed" className={style.EyeAlso} role="presentation" onClick={() => setPassShowAlso(false)} data-test-id="eye-closed" />
            : <img src={EyeOpen} alt="Eye" className={style.EyeAlso} role="presentation" onClick={() => setPassShowAlso(true)} data-test-id="eye-opened" />
    )
}