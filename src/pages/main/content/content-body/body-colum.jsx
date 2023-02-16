import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import style from "./body-colum.module.css"
import cat from "../../../../photo/image/cat.svg"
import { Rating } from "../../../rating-fn/rating"


export function BodyColum() {
    const host = "https://strapi.cleverland.by"

    const content = useSelector((state) => state.content.content)
    return (
        <div className={style.container}>
            {content.length > 0 ? content.map((el) =>
                <div className={style.item} data-test-id='card'>
                    {el.image === null ?
                        <NavLink to={`/books/all/${el.id}`}><img src={cat} alt="book" className={style.item__image} /></NavLink> :
                        <NavLink to={`/books/all/${el.id}`}><img src={host + el.image.url} alt="book" className={style.item__image} loading="lazy" /></NavLink>
                    }
                    <div className={style.colum}>
                        <NavLink to={`/books/all/${el.id}`}><span className={style.colum__title}>{el.title}</span></NavLink>
                        <span className={style.colum__author}>{el.authors}</span>
                        <div className={style.box}>
                            {el.rating !== null ?
                                <div className={style.box__rating}>
                                    {Rating(el.rating).map((el) => <img src={el} alt="rating" />)}
                                </div>
                                :
                                <span className={style.box__estimation} >ещё нет оценок</span>}
                            {el.delivery === null && el.booking === null
                                ?
                                <NavLink to={`/Book/${el.id}`}><button className={style.box__btn} type="button">Забронировать</button></NavLink>
                                :
                                el.delivery !== null ?
                                    <button className={style.box__btnBusy} type="button">Занята</button>
                                    :
                                    <button className={style.box__btnBooked} type="button">Забронирована</button>
                            }
                        </div>
                    </div>
                </div>
            ) :
                <div>Таких книг нету 🥲</div>
            }
        </div>
    )
}