import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/slices/auth/auth-selector";
import { Registration } from "./registration/registration";
import style from "./authorization.module.scss"
import { Loader } from "../loader/loader";
import { StatusBlock } from "../status-block/error-block/status-block";
import { ErrorCoincidence, ErrorText, SuccessRegistration } from "../status-block/error-info/error-info";
import { SuccessBlock } from "../status-block/success-block/success-block";



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
                        statusRegistration === "error" ? <StatusBlock  {...ErrorText} /> :
                            statusRegistration === "coincidences" ? <StatusBlock  {...ErrorCoincidence} /> :
                                statusRegistration === "success" ? <SuccessBlock {...SuccessRegistration} /> :
                                    null}
            </div>
        </div>
    )
}