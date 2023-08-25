import React, { useState, Fragment, useEffect } from 'react'
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
import { Modal } from 'antd';
import Trailer from '../Trailer';
export default function MovieList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.movieListReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeMovie, setActiveMovie] = useState('')
    const showModal = (movie) => {
        setActiveMovie(movie)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    if (loading) {
        return (
            <div className='rounded-md border border-gray-500 bg-white px-3 py-5 flex justify-center gap-3 mb-5'>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                </div>
            </div>
        )
    }
    else {
        return (
            <Fragment>
                <Modal destroyOnClose width={1000} footer='' title={activeMovie.tenPhim} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Trailer trailer={activeMovie.trailer} />
                </Modal>
                <Swiper
                    // install Swiper modules
                    style={{ fontFamily: 'movieFont' }}
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
                                            <button className='relative top-1/2 left-1/2' style={{ transform: 'translate(-50%,-50%)' }}
                                                onClick={() => showModal(movie)}
                                            >
                                                <FontAwesomeIcon icon={faCirclePlay} className='text-4xl opacity-90 text-gray-200 hover:opacity-100 hover:scale-110 duration-300 ' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='p-3 bg-white flex flex-col justify-around gap-3'>
                                        <h1 title={movie.tenPhim} className='font-bold text-blue-600 hover:text-blue-700 hover:underline duration-300 cursor-pointer uppercase h-8 mb-3'
                                            onClick={() => navigate(`/detail/${movie.maPhim}`)}
                                        >{movie.tenPhim.slice(0, 20)}</h1>
                                        <p className='text-sm md:text-base capitalize text-gray-500 mb-5' style={{ height: 50 }} title={movie.moTa}>{movie.moTa.slice(0, 50)}</p>
                                        <div className='flex gap-3 items-center'>
                                            <button className='w-full p-2 bg-blue-600 text-white rounded-md md:text-base font-bold hover:bg-blue-700 duration-300 hover:scale-105'
                                                onClick={() => navigate(`/detail/${movie.maPhim}`)}
                                            >Đặt vé</button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Fragment>
        )
    }
}
