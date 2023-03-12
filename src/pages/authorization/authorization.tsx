import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/slices/auth/auth-selector";
import { Registration } from "./registration/registration";
import style from "./authorization.module.scss"
import { Error } from "./error/error";
import { Coincidence } from "./coincidence/coincidence";
import { Success } from "./success/success";
import { Loader } from "../loader/loader";


export function LayoutAuthorization() {

    const { statusRegistration, statusLoading } = useSelector(selectAuth)

    return (
        <div className={style.background}>
            <div className={style.box} data-test-id="auth">
                <span className={style.title}>
                    Cleverland
                </span>
                {statusLoading ? <Loader /> :
                    statusRegistration === "registration" ? <Registration /> :
                        statusRegistration === "error" ? <Error /> :
                            statusRegistration === "coincidences" ? <Coincidence /> :
                                statusRegistration === "success" ? <Success /> :
                                    null}
            </div>
        </div>
    )
}