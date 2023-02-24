import style from "./footer.module.scss"
import facebook from "../../photo/icon/facebook.svg"
import instagram from "../../photo/icon/instagram.svg"
import vk from "../../photo/icon/vk.svg"
import Iinkidin from "../../photo/icon/Iinkidin.svg"

export function Footer() {
    return (
        <div className={style.container}>
            <div className={style.block}>
                <span className={style.copy}>© 2020-2023 Cleverland. Все права защищены.</span>
                <div className={style.images}>
                    <img src={facebook} alt="" className={style.images__icon} />
                    <img src={instagram} alt="" className={style.images__icon} />
                    <img src={vk} alt="" className={style.images__icon} />
                    <img src={Iinkidin} alt="" className={style.images__icon} />
                </div>
            </div>
        </div>
    )
}