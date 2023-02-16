import { useParams } from "react-router-dom"
import style from "./rating-zero.module.css"
import rating from "../../../photo/image/rating.svg"

export function RatingZero(props) {
    const id = useParams()
    return (
        <div className={style.container}>
            <img src={rating} alt="rating" className={style.container__img} />
            <span className={style.container__text}>ещё нет оценок</span>
        </div>
    )
}