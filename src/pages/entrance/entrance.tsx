import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/slices/auth/auth-selector"
import style from "../authorization/authorization.module.scss"
import { Loader } from "../loader/loader"
import { LoginPasswordError } from "./error/login-password-error"
import { LoginPassword } from "./login-password/login-password"

export function Entrance() {

    const { statusAuthorization, statusLoading } = useSelector(selectAuth)
    return (
        <>
            <div className={style.background}>
                <div className={style.box} data-test-id="auth">
                    <span className={style.title}>
                        Cleverland
                    </span>
                    {statusAuthorization === "login" ? <LoginPassword /> :
                        statusAuthorization === "error" ? <LoginPasswordError /> : null}
                </div>
            </div>
            {statusLoading && <Loader />}
        </>
    )
}