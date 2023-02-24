import { IContent } from "../../../../redux/slices/content/content-type"
import style from "./body-row.module.scss"


export const FilterRed = ((el: IContent, search: string) => {
    const str = el.title.split("")
    if (search !== "") {
        if (el.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            const indexStart = el.title.toLowerCase().indexOf(search.toLowerCase())
            const indexEnd = indexStart + search.length
            const red = `<span class=${style.red} data-test-id='highlight-matches'>${str.slice(indexStart, indexEnd).join("")}</span>`
            str.splice(indexStart, search.length, red)
        }
    }
    return <div dangerouslySetInnerHTML={{ __html: str.join("") }} />
})