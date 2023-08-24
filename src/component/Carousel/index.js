import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './duck/action';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
export default function Carousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector(state => state.bannerReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    return (
        <section className='flex justify-center py-14 bg-blue-100'>
            <div className='w-4/5 flex flex-col lg:flex-row'>
                <div className='lg:w-1/2'>
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
                                <SwiperSlide key={index} >
                                    <img src={item.hinhAnh} alt={item.maPhim} className='w-full object-contain' />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='lg:w-1/2 lg:pl-20 pt-5'>
                    <h1 className='font-bold text-xl md:text-3xl text-blue-600 mb-3'>Đặt vé ngay tại Cyber Movies</h1>
                    <p className='font-medium text-sm md:text-base mb-2'>Số lượng phim đa dạng,phong phú</p>
                    <p className='font-medium text-sm md:text-base mb-2'>Đặt vé nhanh chóng,đơn giản</p>
                    <p className='font-medium text-sm md:text-base mb-2'>Thanh đoán tiện lợi</p>
                    <p className='font-medium text-sm md:text-base mb-5'>Hỗ trợ,bảo vệ quyền lợi khách hàng </p>
                    <Link to='heThongSuatChieu' smooth={true} duration={500} offset={-70} spy={true} className='bg-blue-600 p-2 md:py-2 md:px-3 font-semibold text-white rounded-md hover:bg-blue-700 duration-300'>Đặt vé ngay</Link>
                </div>
            </div>
        </section>

    );
}
