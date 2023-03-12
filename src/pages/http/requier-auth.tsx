import { useLocation, Navigate, useSearchParams } from "react-router-dom"



export const RequireAuth = ({ children }: any) => {
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || "/"
    const token = localStorage.getItem("token")

    if (token !== null) {
        return children
    }

    return <Navigate to="/auth" state={{ from: location }} />
}