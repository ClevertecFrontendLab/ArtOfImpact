import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom"
import { selectAuth } from "../../redux/slices/auth/auth-selector";
import { Loader } from "../loader/loader";
import { RecoveryEmail } from "./email/email";
import { RecoveryError } from "./error/error";
import { RecoveryPassword } from "./password/password";
import style from "./recovery.module.scss"
import { RecoverySend } from "./send/send";
import { RecoverySuccess } from "./success/success";

export function Recovery() {
    const [searchParams, setSearchParams] = useSearchParams()
    const Code = searchParams.get("code") || "";
    const CodeBe = searchParams.has("code")

    const { statusRecovery, statusLoading } = useSelector(selectAuth)


    return (
        <>
            <div className={style.background}>
                <div className={style.box} data-test-id="auth">
                    <span className={style.title}>
                        Cleverland
                    </span>
                    {statusRecovery === "error" ? <RecoveryError />
                        : statusRecovery === "success" ? <RecoverySuccess /> :
                            CodeBe || statusRecovery === "password" ? <RecoveryPassword />
                                : statusRecovery === "send" ? <RecoverySend />
                                    : statusRecovery === "email" ? <RecoveryEmail />
                                        : null}
                </div>
            </div>
            {statusLoading && <Loader />}
        </>
    )
}