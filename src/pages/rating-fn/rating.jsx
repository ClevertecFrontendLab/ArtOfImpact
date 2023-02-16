import start_full from "../../photo/icon/star_full.svg"
import start_empty from "../../photo/icon/start_empty.svg"

export function Rating(rating) {
    const arr = []

    for (let i = 0; i < 6; i++) {
        if (i < Math.ceil(rating)) {
            arr.push(start_full)
        } else if (i > Math.ceil(rating)) {
            arr.push(start_empty)
        }
    }
    return arr
}