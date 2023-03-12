import EyeOpen from "../../../../photo/icon/Eye.svg"
import EyeClosed from "../../../../photo/icon/EyeClosed.svg"


export function Eye({ passShow, setPassShow, style }: any) {
    return (
        passShow ? <img src={EyeClosed} alt="EyeClosed" className={style} role="presentation" onClick={() => setPassShow(false)} data-test-id="eye-closed" />
            : <img src={EyeOpen} alt="Eye" className={style} role="presentation" onClick={() => setPassShow(true)} data-test-id="eye-opened" />
    )
}