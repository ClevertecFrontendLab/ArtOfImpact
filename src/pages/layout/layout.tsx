/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import "./layout.scss"
import { asideFetch } from "../../redux/slices/aside/aside-slice";
import { useAppDispatch } from "../../redux/store";

export function Layout() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            dispatch(asideFetch({ token }))
        }
    }, [])

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}