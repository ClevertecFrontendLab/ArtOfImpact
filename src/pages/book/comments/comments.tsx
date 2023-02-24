import { useParams } from "react-router-dom"
import cn from "classnames"
import React, { useState } from "react"
import style from "./comments.module.scss"
import user_coment from "../../../photo/icon/user-coment.svg"
import { Rating } from "../../rating-fn/rating"
import { IBook } from "../../../redux/slices/content/content-type"


export function Comments({ comments }: IBook) {
    const id = useParams()

    const [isArrow, setIsArrow] = useState(true)

    return (
        <>
            <div className={style.header}>
                <span>Отзывы <span className={style.number}>{comments?.length}</span></span>
                <div className={cn(style.boxArrow, { [style.active]: isArrow })} onClick={() => (setIsArrow(!isArrow))}
                    role="presentation" data-test-id='button-hide-reviews'>
                    <span className={cn(style.arrow, { [style.active]: isArrow })} />
                </div>
            </div>
            <hr className={cn(style.hr, { [style.visible]: !isArrow })} />
            {comments?.map((el, id) =>
                <div className={cn(style.answer, { [style.hidden]: !isArrow })}>
                    <div className={style.title}>
                        <img src={user_coment} alt="user" className={style.title__icon} />
                        <span className={style.title__name}>{el.user.lastName}</span>
                        <span className={style.title__date}>{el.createdAt.split('T')[0]}</span>
                    </div>
                    <div className={style.rating}>
                        {Rating(el.rating).map((el) => <img src={el} alt="rating" />)}
                    </div>
                    <span className={style.text}>
                        {el.text}
                    </span>
                </div>
            )}
        </>
    )
}