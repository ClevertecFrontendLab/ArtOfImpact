/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import style from "./book-page.module.scss"
import { About } from "./about/about"
import { AboutColum } from "./about/about-colum"
import { RatingStarts } from "./rating/rating-stars"
import { RatingZero } from "./rating/rating-zero"
import { Information } from "./information/information"
import { Comments } from "./comments/comments"
import { bookFetch, filterFetch } from "../../redux/slices/content/content-slice"
import { Loader } from "../loader/loader"
import { Error } from "../error/error"
import { selectContent } from "../../redux/slices/content/content-selector"
import { useAppDispatch } from "../../redux/store"



export function BookPage() {
    const { bookId } = useParams()
    const dispatch = useAppDispatch()
    const { book, status } = useSelector(selectContent)
    const navigate = useNavigate()
    const location = useLocation()
    const [width, setWidth] = useState(0)

    window.addEventListener(`resize`, event => {
        setWidth(window.innerWidth)
    }, false);

    useEffect(() => {
        setWidth(window.innerWidth)
        if (bookId) {
            dispatch(bookFetch({ bookId }))
        }
    }, [])

    const body = document.querySelector("body")

    if (body !== null) {
        if (status === "loading") {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "auto"
        }
    }

    function Back() {
        navigate(`${location.state}`)
    }

    return (
        <>
            <div className={style.header}>
                <div className={style.headerBox}>
                    <span className={style.headerBox__title} onClick={() => Back()} role="presentation" data-test-id='breadcrumbs-link'>{location.state === "/books/all" ? "Все книги" : book.categories}</span>
                    <span className={style.headerBox__subtitle}>/</span>
                    <span className={style.headerBox__title} data-test-id='book-name'>{book.title}</span>
                </div>
            </div>
            {status === "success" ?
                <>
                    {width >= 1000 ?
                        <About {...book} />
                        :
                        <AboutColum {...book} />
                    }
                    <div className={style.estimation}>
                        <span className={style.estimation__title}>Рейтинг</span>
                        <hr className={style.estimation__hr} />
                        {book.rating !== null ?
                            <RatingStarts {...book} />
                            :
                            <RatingZero />
                        }
                    </div>
                    <Information {...book} />
                    <div className={style.comments}>
                        {book.comments !== null ?
                            <Comments {...book} />
                            :
                            <div className={style.comments__zero}>
                                <span>Отзывы <span className={style.number}>0</span></span>
                            </div>
                        }
                    </div>
                    <div className={style.feedback}>
                        <button type="button" className={style.feedback__btn}>оценить книгу</button>
                    </div>
                </>
                : status === "loading" ?
                    <div className={style.loaderBox}>
                        <Loader />
                    </div>
                    :
                    <div className={style.loaderBox}>
                        <Error />
                    </div>
            }
        </>
    )
}
