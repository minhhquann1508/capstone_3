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
export default function Carousel() {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(state => state.bannerReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    console.log('loading', loading);
    console.log('data', data);
    console.log('error', error);
    if (loading) {
        return (
            <section className='flex justify-center py-14'>
                <div className='w-4/5'>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </section>
        )
    }
    else {
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
                        <button className='bg-blue-600 p-2 md:py-2 md:px-3 font-semibold text-white rounded-md hover:bg-blue-700 duration-300'>Đặt vé ngay</button>
                    </div>
                </div>
            </section>

        );
    }
}
