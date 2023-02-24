/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

import "./layout.scss"



export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}