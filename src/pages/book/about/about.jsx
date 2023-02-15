import { useParams } from "react-router-dom"
import style from "./about.module.css"
import { Swipers } from "./swiper/swiper"

export function About(props) {

    const id = useParams()

    return (
        <div className={style.container}>
            <div className={style.img}>
                <Swipers info={props.info.images} />
            </div>
            <div className={style.info}>
                <div className={style.info__title}>{props.info.title}</div>
                {props.info.authors.map((el, id) =>
                    <div className={style.info__author}>{el}</div>
                )}
                {props.info.delivery === null && props.info.booking === null
                    ?
                    <button className={style.info__button} type="button">Забронировать</button>
                    :
                    props.info.delivery !== null ?
                        <button className={style.info__buttonBusy} type="button">Занята</button>
                        :
                        <button className={style.info__buttonBooked} type="button">Забронирована</button>
                }
                <div className={style.info__about}>О книге</div>
                <div className={style.info__text}>{props.info.description}</div>
            </div>
        </div>
    )
}