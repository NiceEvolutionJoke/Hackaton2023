import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import classes from './FirstScreen.module.scss';
const FirstScreen = () => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <div className="spa_slider">
            <div className="swiper3" id="swiper3">
                <Swiper
                    loop={true}
                    ref={sliderRef}
                    spaceBetween={20}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    pagination={{
                        clickable: true,
                        el: '.sp3',
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        980: {
                            slidesPerGroup: 1,
                        },
                    }}
                >
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg}>
                            <img src="" alt="" />
                        </div>
                        <div className={classes.title}>Тренажерный зал</div>
                    </SwiperSlide>
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg}>
                            <img src="" alt="" />
                        </div>
                        <div className={classes.title}>Тренажерный зал</div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="special_nav spa_nav flex align-items-center justify-content-between">
                <div className="prev3" onClick={handlePrev}></div>
                <div className="swiper-pagination sp3"></div>
                <div className="next3" onClick={handleNext}></div>
            </div>
        </div>
    );
};

export default FirstScreen;
