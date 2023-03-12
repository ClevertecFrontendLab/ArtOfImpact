import { useLocation, Navigate } from "react-router-dom"



export const RequireToken = ({ children }: any) => {
    const location = useLocation()

    const token = localStorage.getItem("token")
    const fromPage = location.state?.from?.pathname || "/"

    console.log(fromPage)
    if (token !== null) {
        return <Navigate to="/books/all" state={{ from: location }} />
    }

    return children
}