import { IBook } from "../../../redux/slices/content/content-type"
import style from "./information.module.scss"


export function Information({ categories, publish, issueYear, pages, cover, format, weight, ISBN, producer }: IBook) {

    return (
        <div className={style.container}>
            <span className={style.container__title}>Подробная информация</span>
            <hr className={style.container__hr} />
            <div className={style.columns}>
                <div className={style.columnsOne}>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Издательство</span>
                        <span className={style.one__subtitle}>{publish}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Год издания</span>
                        <span className={style.one__subtitle}>{issueYear}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Страниц</span>
                        <span className={style.one__subtitle}>{pages}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Переплёт</span>
                        <span className={style.one__subtitle}>{cover}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Формат</span>
                        <span className={style.one__subtitle}>{format}</span>
                    </div>
                </div>
                <div className={style.columnsTwo}>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Жанр</span>
                        <span className={style.two__subtitle}>
                            {categories?.map((el) => el
                            )}
                        </span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Вес</span>
                        <span className={style.two__subtitle}>{weight}г</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>ISBN</span>
                        <span className={style.two__subtitle}>{ISBN}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Изготовитель</span>
                        <span className={style.two__subtitle}>{producer}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}