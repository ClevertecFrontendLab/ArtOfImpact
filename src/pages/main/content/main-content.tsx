/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [isButton, setIsButton] = useState<boolean>(true)
    const { status } = useSelector(selectContent)
    const { asides } = useSelector(selectAside)

    useEffect(() => {
        if (location.pathname === '/books/all') {
            dispatch(contentFetch())
        } else {
            dispatch(addContent([]))
            const name = location.pathname.split("/")
            const rusName = asides.filter((el) => el.path === name[name.length - 1])
            dispatch(filterFetch(rusName[0]))
            dispatch(setActiveNumber(rusName[0].id))
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