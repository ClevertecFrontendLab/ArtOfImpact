/* eslint-disable no-param-reassign */
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import style from "./body-row.module.scss"
import cat from "../../../../photo/image/cat.svg"
import { Rating } from "../../../rating-fn/rating"
import { selectContent } from "../../../../redux/slices/content/content-selector"
import { FilterRed } from "./red-color"
import { BASE_URL } from "../../../host-url"




export function BodyRow() {
    const location = useLocation()
    const navigate = useNavigate()
    const { content, search } = useSelector(selectContent)

    const FilterContent = content.filter((el) => {
        if (el.title.toLowerCase().includes(search.toLowerCase())) {
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
                    <div className={style.item} data-test-id="card" onClick={() => navigate(`${location.pathname}/${el.id}`, { state: location.pathname })} role="presentation">
                        <div className={style.header}>
                            {el.image === null ?
                                <img src={cat} alt="book" className={style.header__image} loading="lazy" role="presentation" /> :
                                <img src={BASE_URL + el.image.url} alt="book" className={style.header__image} loading="lazy" />
                            }
                            <div className={style.header__estimation}>
                                {el.rating !== null ?
                                    Rating(el.rating).map((el) => <img src={el} alt="rating" />)
                                    :
                                    <span >ещё нет оценок</span>}
                            </div>
                        </div>
                        <span className={style.item__title}> {FilterRed(el, search)}</span>
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
                    <div className={style.noFind}>
                        <div className={style.noFind__text} data-test-id='search-result-not-found'>По запросу ничего не найдено</div>
                    </div>
            }
        </div>
    )
}