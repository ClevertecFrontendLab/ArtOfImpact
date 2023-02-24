import { useParams } from "react-router-dom"
import { IBook } from "../../../redux/slices/content/content-type"
import { Rating } from "../../rating-fn/rating"
import style from "./rating-starts.module.scss"

export function RatingStarts({ rating }: IBook) {
    const id = useParams()
    return (
        <div className={style.container}>
            {rating !== null && Rating(rating).map((el) => <img src={el} alt="rating" />)}
            <span className={style.container__text}>{rating}</span>
        </div>
    )
}