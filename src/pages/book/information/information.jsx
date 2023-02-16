import style from "./information.module.css"

export function Information(props) {

    return (
        <div className={style.container}>
            <span className={style.container__title}>Подробная информация</span>
            <hr className={style.container__hr} />
            <div className={style.columns}>
                <div className={style.columnsOne}>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Издательство</span>
                        <span className={style.one__subtitle}>{props.info.publish}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Год издания</span>
                        <span className={style.one__subtitle}>{props.info.issueYear}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Страниц</span>
                        <span className={style.one__subtitle}>{props.info.pages}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Переплёт</span>
                        <span className={style.one__subtitle}>{props.info.cover}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.one__title}>Формат</span>
                        <span className={style.one__subtitle}>{props.info.format}</span>
                    </div>
                </div>
                <div className={style.columnsTwo}>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Жанр</span>
                        <span className={style.two__subtitle}>
                            {props.info.categories?.map((el) => el
                            )}
                        </span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Вес</span>
                        <span className={style.two__subtitle}>{props.info.weight}г</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>ISBN</span>
                        <span className={style.two__subtitle}>{props.info.ISBN}</span>
                    </div>
                    <div className={style.columnsBox}>
                        <span className={style.two__title}>Изготовитель</span>
                        <span className={style.two__subtitle}>{props.info.producer}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}