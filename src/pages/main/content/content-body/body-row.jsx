import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import style from "./body-row.module.css"
import cat from "../../../../photo/image/cat.svg"
import { Rating } from "../../../rating-fn/rating"




export function BodyRow() {
    const host = "https://strapi.cleverland.by"
    const content = useSelector((state) => state.content.content)

    return (
        <div className={style.container}>
            {content.length > 0 ? content.map((el) =>
                <div className={style.item} data-test-id='card'>
                    <div className={style.header}>
                        {el.image === null ?
                            <NavLink to={`/books/all/${el.id}`}><img src={cat} alt="book" className={style.header__image} loading="lazy" /></NavLink> :
                            <NavLink to={`/books/all/${el.id}`}><img src={host + el.image.url} alt="book" className={style.header__image} /></NavLink>
                        }
                        <div className={style.header__estimation}>
                            {el.rating !== null ?
                                Rating(el.rating).map((el) => <img src={el} alt="rating" />)
                                :
                                <span >ещё нет оценок</span>}
                        </div>
                    </div>
                    <span className={style.item__title}>{el.title}</span>
                    <div className={style.footer}>
                        <span className={style.footer__text}>{el.authors}</span>
                        {el.delivery === null && el.booking === null
                            ?
                            <NavLink to={`/Book/${el.id}`}><button className={style.footer__btn} type="button">Забронировать</button></NavLink>
                            :
                            el.delivery !== null ?
                                <button className={style.footer__btnBusy} type="button">Занята</button>
                                :
                                <button className={style.footer__btnBooked} type="button">Забронирована</button>
                        }
                    </div>
                </div>
            ) :
                <div>Таких книг нету 🥲</div>
            }
        </div>
    )
}