import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './duck/action';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function MovieList() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.movieListReducer);
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    console.log(data);
    if (loading) {
        return (
            <div>..loading</div>
        )
    }
    else {
        return (
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={5}
                navigation
            >
                {data?.map((movie) => {
                    return (
                        <SwiperSlide key={movie.maPhim}>
                            <div className='border'>
                                <div className='relative'>
                                    <img src={movie.hinhAnh} alt={movie.tenPhim} className='object-cover ' style={{ width: '100%', height: 300 }} />
                                    <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                                </div>
                                <div className='p-3'>
                                    <h1 className='font-medium uppercase text-lg'>{movie.tenPhim}</h1>
                                    <p className='text-sm text-gray-500'>{movie.moTa.slice(0, 100)}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        )
    }
}
