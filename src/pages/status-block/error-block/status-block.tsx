import { useAppDispatch } from "../../../redux/store"
import style from "./status-block.module.scss"

interface IErrorBlock {
    title: string,
    subtitle: string,
    button: string,
    action: any,
    type: string,
}

export function StatusBlock({ title, subtitle, button, action, type }: IErrorBlock) {
    const dispatch = useAppDispatch()
    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>{title}</span>
            <span className={style.container__subtitle}>{subtitle}</span>
            <button type="button" className={style.container__btn} onClick={() => dispatch(action({ type }))}>{button}</button>
        </div>
    )
}