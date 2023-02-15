import style from "./loader.module.css"
import preloader from "../../photo/icon/preloader.svg"


export function Loader() {

    return (
        <div className={style.loader} data-test-id='loader'>
            <img className={style.loader__item} src={preloader} alt="preloader" />
        </div>
    )
}