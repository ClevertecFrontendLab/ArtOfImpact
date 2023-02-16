import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./main-content.module.css"
import { BodyRow } from './content-body/body-row.jsx';
import { BodyColum } from './content-body/body-colum.jsx';
import { ContentHeader } from './content-header/content-header.jsx';
import { Aside } from './content-aside/content-aside.jsx';
import { addContent, contentFetch } from "../../../redux/slices/content-slice";
import { Loader } from "../../loader/loader";
import { Error } from "../../error/error";

export function Content() {
    const status = useSelector((state) => state.content.status)
    const dispatch = useDispatch()
    const [isButton, setIsButton] = useState(true)

    useEffect(() => {
        dispatch(contentFetch())
    }, [dispatch])


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