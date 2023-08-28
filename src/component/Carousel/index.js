import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './duck/action';
import { useSpring, animated, useTransition } from '@react-spring/web'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
export default function Carousel(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const springsContent = useSpring({
        from: { x: 1000 },
        to: { x: 0 },
        delay: 200,
        config: { tension: 200, friction: 20, duration: 500 }
    })
    const springsBanner = useSpring({
        from: { x: -1000 },
        to: { x: 0 },
        delay: 200,
        config: { tension: 200, friction: 20, duration: 500 }
    })
    const { data } = useSelector(state => state.bannerReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    return (
        <section className='flex justify-center py-14 bg-blue-100' >
            <div className='w-4/5 flex flex-col lg:flex-row'>
                <animated.div className='lg:w-1/2' style={{ ...springsBanner }}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        autoplay={true}
                        navigation
                        className='overflow-hidden'
                    >
                        {data?.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className='w-full h-full'>
                                    <img src={item.hinhAnh} alt={item.maPhim} className='w-full h-full' />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </animated.div>
                <animated.div className='lg:w-1/2 lg:pl-20 pt-5' style={{ ...springsContent }}>
                    <h1 className='font-bold text-xl md:text-3xl text-blue-600 mb-3'>Đặt vé ngay tại Cyber Movies</h1>
                    <p className='text-base md:text-lg mb-2'>Số lượng phim đa dạng,phong phú</p>
                    <p className='text-base md:text-lg mb-2'>Đặt vé nhanh chóng,đơn giản</p>
                    <p className='text-base md:text-lg mb-2'>Thanh đoán tiện lợi</p>
                    <p className='text-base md:text-lg mb-5'>Hỗ trợ,bảo vệ quyền lợi khách hàng </p>
                    <Link to='heThongSuatChieu' smooth={true} duration={500} offset={-70} spy={true} className='cursor-pointer bg-blue-600 md:text-lg p-2 md:py-2 md:px-3 font-semibold text-white rounded-md hover:bg-blue-700 duration-300'>Đặt vé ngay</Link>
                </animated.div>
            </div>
        </section>

    );
}
