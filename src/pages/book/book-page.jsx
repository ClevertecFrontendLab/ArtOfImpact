/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import style from "./book-page.module.css"
import { About } from "./about/about"
import { AboutColum } from "./about/about-colum"
import { RatingStarts } from "./rating/rating-stars"
import { RatingZero } from "./rating/rating-zero"
import { Information } from "./information/information"
import { Comments } from "./comments/comments"
import { bookFetch } from "../../redux/slices/content-slice"
import { Loader } from "../loader/loader"
import { Error } from "../error/error"
import { Footer } from "../footer/footer"
import { Header } from "../header/header"

export function BookPage() {
    const id = useParams()
    const dispatch = useDispatch()
    const book = useSelector((state) => state.content.book)
    const status = useSelector((state) => state.content.status)

    const [width, setWidth] = useState(0)

    window.addEventListener(`resize`, event => {
        setWidth(window.innerWidth)
    }, false);

    useEffect(() => {
        setWidth(window.innerWidth)
        dispatch(bookFetch({ id }))
    }, [])

    return (
        <>
            < Header />
            <div className={style.header}>
                <div className={style.headerBox}>
                    <span className={style.headerBox__title}>{book.categories} / {book.title}</span>
                </div>
            </div>
            {status === "success" && book !== [] ?
                <>
                    {width >= 1000 ?
                        <About info={book} />
                        :
                        <AboutColum info={book} />
                    }
                    <div className={style.estimation}>
                        <span className={style.estimation__title}>Рейтинг</span>
                        <hr className={style.estimation__hr} />
                        {book.rating !== null ?
                            <RatingStarts info={book} />
                            :
                            <RatingZero info={book} />
                        }
                    </div>
                    <Information info={book} />
                    <div className={style.comments}>
                        {book.comments !== null ?
                            <Comments info={book} />
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
            <Footer />
        </>
    )
}
