import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import style from "./body-colum.module.scss"
import cat from "../../../../photo/image/cat.svg"
import { Rating } from "../../../rating-fn/rating"
import { selectContent } from "../../../../redux/slices/content/content-selector"


export function BodyColum() {
    const host = "https://strapi.cleverland.by"

    const { content, search } = useSelector(selectContent)
    const location = useLocation()
    const navigate = useNavigate()

    const FilterContent = content.filter((el) => {
        if (el.title.toLowerCase().includes(search.toLowerCase())) {
            console.log(el.title.toLowerCase())
            return true;
        }
        return false;
    })

    return (
        <div className={style.container}>
            {content.length < 1 ?
                <div className={style.noFind}>
                    <div className={style.noFind__text} data-test-id='empty-category'>В этой категории книг ещё нет</div>
                </div>
                : FilterContent.length > 0 ? FilterContent.map((el) =>
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
                    <div className={style.noFind}>
                        <div className={style.noFind__text} data-test-id='search-result-not-found'>По запросу ничего не найдено</div>
                    </div>
            }
        </div>
    )
}