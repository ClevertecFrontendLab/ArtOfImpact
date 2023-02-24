import { IBook } from "../../../redux/slices/content/content-type"
import { Aside } from "../../main/content/content-aside/content-aside"
import style from "./about-colum.module.scss"
import { SwiperColum } from "./swiper/swiper-colum"

export function AboutColum({ images, title, authors, delivery, booking, description }: IBook) {
    return (
        <>
            <Aside />
            <div className={style.container}>
                <div className={style.colum}>
                    <SwiperColum info={images} />
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
                    </div>
                </div>
                <div>
                    <div className={style.container__about}>О книге</div>
                    <div className={style.container__text}>{description}</div>
                </div>
            </div>
        </>
    )
}