import { Link } from "react-router-dom"
import style from "./success-block.module.scss"

interface ISuccessBlock {
    path: string,
    title: string,
    text: string,
    button: string
}

export function SuccessBlock({ path, title, text, button }: ISuccessBlock) {

    return (
        <div className={style.container} data-test-id="status-block">
            <span className={style.container__title}>{title}</span>
            <span className={style.container__subtitle}>{text}</span>
            <Link to={path} className={style.link}><button type="button" className={style.container__btn}>{button}</button></Link>
        </div>
    )
}