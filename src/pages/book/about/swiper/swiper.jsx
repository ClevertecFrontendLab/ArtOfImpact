import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames"
import { FreeMode, Navigation, Thumbs } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./swiper.css"
import cat from "../../../../photo/image/cat.svg"


export function Swipers(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiper, setSwiper] = useState(0)

    const host = "https://strapi.cleverland.by"


    return (
        <>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                data-test-id='slide-big'
            >
                {props.info.map((el, id) =>
                    props.info === null ?
                        <SwiperSlide >
                            <img src={cat} alt="book" className="img__small" />
                        </SwiperSlide>
                        :
                        <SwiperSlide>
                            <img src={host + el.url} alt="book" className="img__small" loading="lazy" />
                        </SwiperSlide>
                )}
            </Swiper>
            {props.info.length > 1 &&
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={0}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {props.info.map((el, id) =>
                        props.info === null ?
                            <SwiperSlide className={cn("mySlider", { "active": id === swiper })} onClick={() => (setSwiper(id))} data-test-id='slide-mini'>
                                <img src={cat} alt="book" className="img__photo" />
                            </SwiperSlide>
                            :
                            <SwiperSlide className={cn("mySlider", { "active": id === swiper })} onClick={() => (setSwiper(id))} data-test-id='slide-mini'>
                                <img src={host + el.url} alt="book" className="img__photo" loading="lazy" />
                            </SwiperSlide>
                    )}
                </Swiper>
            }
        </>
    )
}