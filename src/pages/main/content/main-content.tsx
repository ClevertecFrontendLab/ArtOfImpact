/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import style from "./main-content.module.scss"
import { BodyRow } from './content-body/body-row';
import { BodyColum } from './content-body/body-colum';
import { ContentHeader } from './content-header/content-header';
import { Aside } from './content-aside/content-aside';
import { addContent, contentFetch, filterFetch } from "../../../redux/slices/content/content-slice";
import { Loader } from "../../loader/loader";
import { Error } from "../../error/error";
import { selectContent } from "../../../redux/slices/content/content-selector";
import { useAppDispatch } from "../../../redux/store";
import { selectAside } from "../../../redux/slices/aside/aside-selector";
import { setActiveNumber } from "../../../redux/slices/aside/aside-slice";



export function Content() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [isButton, setIsButton] = useState<boolean>(true)
    const { status } = useSelector(selectContent)
    const { asides } = useSelector(selectAside)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token !== null) {
            if (location.pathname === '/books/all') {
                dispatch(contentFetch({ token }))
            } else {
                dispatch(addContent([]))
                const rusName = location.pathname.split("/")
                const name = asides.filter((el) => el.path === rusName[rusName.length - 1])
                dispatch(filterFetch({ name: name[0]?.name, token }))
                dispatch(setActiveNumber(name[0].id))
            }
        }
    }, [])

    return (
        <div className={style.container}>
            <Aside />
            {status === "success" ?
                <div className={style.content}>
                    <ContentHeader isButton={isButton} setIsButton={setIsButton} />
                    {isButton === true ? <BodyRow /> : <BodyColum />}
                </div>
                : status === "loading" ?
                    <Loader />
                    : <Error />
            }
        </div>
    )
}