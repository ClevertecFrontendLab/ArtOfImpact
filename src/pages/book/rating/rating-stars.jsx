import { useParams } from "react-router-dom"
import { Rating } from "../../rating-fn/rating"
import style from "./rating-starts.module.css"

export function RatingStarts(props) {
    const id = useParams()
    return (
        <div className={style.container}>
            {Rating(props.info.rating).map((el) => <img src={el} alt="rating" />)}
            <span className={style.container__text}>{props.info.rating}</span>
        </div>
    )
}