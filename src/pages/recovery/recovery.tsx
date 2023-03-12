import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom"
import { selectAuth } from "../../redux/slices/auth/auth-selector";
import { ErrorRecovery, SuccessRecovery } from "../status-block/error-info/error-info";
import { StatusBlock } from "../status-block/error-block/status-block";
import { Loader } from "../loader/loader";
import { RecoveryEmail } from "./email/email";
import { RecoveryPassword } from "./password/password";
import style from "./recovery.module.scss"
import { RecoverySend } from "./send/send";
import { SuccessBlock } from "../status-block/success-block/success-block";

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
                    {statusRecovery === "error" ? <StatusBlock {...ErrorRecovery} />
                        : statusRecovery === "success" ? <SuccessBlock {...SuccessRecovery} /> :
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