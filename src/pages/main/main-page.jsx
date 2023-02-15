import style from "./main-page.module.css"
import { Content } from './content/main-content.jsx';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";


export function MainPage() {

    return (
        <section className={style.page}>
            <Header />
            <Content />
            <Footer />
        </section>
    )
};
