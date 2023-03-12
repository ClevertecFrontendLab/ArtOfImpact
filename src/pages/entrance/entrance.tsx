import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/slices/auth/auth-selector"
import style from "../authorization/authorization.module.scss"
import { ErrorAuth } from "../status-block/error-info/error-info"
import { StatusBlock } from "../status-block/error-block/status-block"
import { Loader } from "../loader/loader"
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
                        statusAuthorization === "error" ? <StatusBlock  {...ErrorAuth} /> : null}
                </div>
            </div>
            {statusLoading && <Loader />}
        </>
    )
}