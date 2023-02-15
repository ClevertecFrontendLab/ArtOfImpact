import { useParams } from "react-router-dom"
import { Aside } from "../../main/content/content-aside/content-aside"
import style from "./about-colum.module.css"
import { SwiperColum } from "./swiper/swiper-colum"

export function AboutColum(props) {

    const id = useParams()

    return (
        <>
            <Aside />
            <div className={style.container}>
                <div className={style.colum}>
                    <SwiperColum info={props.info.images} />
                    <div className={style.info}>
                        <div className={style.info__title}>{props.info.title}</div>
                        {props.info.authors?.map((el) =>
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
                    </div>
                </div>
                <div>
                    <div className={style.container__about}>О книге</div>
                    <div className={style.container__text}>{props.info.description}</div>
                </div>
            </div>
        </>
    )
}