import { IBook } from "../../../redux/slices/content/content-type"
import style from "./about.module.scss"
import { Swipers } from "./swiper/swiper"


export function About({ images, title, authors, delivery, booking, description }: IBook) {

    return (
        <div className={style.container}>
            <div className={style.img}>
                <Swipers info={images} />
            </div>
            <div className={style.info}>
                <div className={style.info__title} data-test-id='book-title'>{title}</div>
                <div className={style.info__author}>{authors}</div>
                {delivery === null && booking === null
                    ?
                    <button className={style.info__button} type="button">Забронировать</button>
                    :
                    delivery !== null ?
                        <button className={style.info__buttonBusy} type="button">Занята</button>
                        :
                        <button className={style.info__buttonBooked} type="button">Забронирована</button>
                }
                <div className={style.info__about}>О книге</div>
                <div className={style.info__text}>{description}</div>
            </div>
        </div>
    )
}