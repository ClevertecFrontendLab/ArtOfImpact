import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper";
import "./swiper-colum.css"
import cat from "../../../../photo/image/cat.svg"


export function SwiperColum(props) {

    const host = "https://strapi.cleverland.by"


    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="swiperColum"
            data-test-id='slide-big'
        >
            {props.info?.map((el) =>
                props.info === null ?
                    <SwiperSlide data-test-id='slide-mini'>
                        <img src={cat} alt="book" className="photo" />
                    </SwiperSlide>
                    :
                    <SwiperSlide data-test-id='slide-mini'>
                        <img src={host + el.url} alt="book" className="photo" loading="lazy" />
                    </SwiperSlide>
            )}
        </Swiper>
    )
}