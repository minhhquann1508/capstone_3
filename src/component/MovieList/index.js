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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
export default function MovieList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.movieListReducer);
    useEffect(() => {
        dispatch(fetchData())
    }, [])
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
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    567: {
                        slidesPerView: 2
                    },
                    789: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    1250: {
                        slidesPerView: 5
                    }
                }}
                navigation
            >
                {data?.filter((movie) => movie.dangChieu === props.dangChieu).map((movie) => {
                    return (
                        <SwiperSlide key={movie.maPhim}>
                            <div className='border'>
                                <div className='relative'>
                                    <img src={movie.hinhAnh} alt={movie.tenPhim} className='object-cover' style={{ width: '100%', height: 300 }} />
                                    <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                        <button className='absolute top-2 left-1.5 p-1 bg-red-500 rounded-lg text-white text-xs flex justify-center items-center font-medium'> <FontAwesomeIcon icon={faStar} className='text-xs text-orange-400' /><span className='ml-0.5'>{movie.danhGia.toFixed(1)}</span></button>
                                        <button className='relative top-1/2 left-1/2' style={{ transform: 'translate(-50%,-50%)' }}>
                                            <FontAwesomeIcon icon={faCirclePlay} className='text-4xl opacity-90 text-gray-200 hover:opacity-100 hover:scale-110 duration-300 ' />
                                        </button>
                                    </div>
                                </div>
                                <div className='p-3 bg-white'>
                                    <h1 className='font-bold text-blue-600 hover:text-blue-700 hover:underline duration-300 cursor-pointer uppercase h-10 mb-3'
                                        onClick={() => navigate(`/detail/${movie.maPhim}`)}
                                    >{movie.tenPhim.slice(0, 30)}</h1>
                                    <p className='text-sm text-gray-500 mb-5' style={{ height: 50 }}>{movie.moTa.slice(0, 50)}</p>
                                    <div className='flex gap-3 items-center'>
                                        <button className='w-full p-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 duration-300 hover:scale-105'>Đặt vé</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        )
    }
}
