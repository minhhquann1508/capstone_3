import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCinemaData } from './duck/action';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
export default function CinemaList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.cinemaListReducer);
    const [brandActive, setBrandActive] = useState(data ? data[0].maHeThongRap : 'BHDStar');
    const containerRef = useRef(null);
    const [itemValue, setItemValue] = useState(0);
    useEffect(() => {
        dispatch(fetchCinemaData(''))
    }, [])
    return (
        <section id='heThongSuatChieu' className='flex justify-center items-center py-20 bg-gray-50'>
            <div className='w-4/5'>
                <h1 className='text-center font-bold text-3xl text-blue-600 mb-10'>Hệ thống suất chiếu</h1>
                {/* Hệ thống rạp chiếu và suất chiếu */}
                <div className='border border-gray-300 rounded-md'>
                    <ul className='flex gap-3 p-3 border-b bg-gray-100 shadow-md'>
                        {data?.map((brand, index) => {
                            return (
                                <li key={index} onClick={() => setBrandActive(brand.maHeThongRap)}
                                    onClickCapture={() => {
                                        containerRef.current.scrollTop = 0;
                                        setItemValue(0)
                                    }}
                                >
                                    <img src={brand.logo} alt={brand.tenHeThongRap} width={55} height={55} className={`${brand.maHeThongRap === brandActive ? 'border-blue-600' : ''} cursor-pointer bg-white rounded-md border-2 p-1`} />
                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        {data?.filter((brand) => brand.maHeThongRap === brandActive).map((brand, index) => {
                            return (
                                <div key={index} className='flex flex-col md:flex-row'>
                                    <div className='w-full md:w-1/3 border-r overflow-auto h-96'>
                                        <ul>
                                            {brand.lstCumRap.map((cinema, index) => {
                                                return (
                                                    <li key={cinema.maCumRap} className={`${index === itemValue ? 'bg-blue-100' : ''} flex items-center gap-2 p-2 border-b border-gray-300 cursor-pointer hover:bg-blue-100 duration-300`}
                                                        onClick={() => {
                                                            containerRef.current.scrollTop = 0;
                                                            setItemValue(index)
                                                        }}
                                                    >
                                                        <img src={brand.logo} alt="logo" width={35} height={35} className='rounded-full border border-gray-300' />
                                                        <div>
                                                            <h1 className='font-bold text-sm md:text-base'>{cinema.tenCumRap}</h1>
                                                            <p className='text-sm md:text-base text-gray-600'>{cinema.diaChi}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className='w-full md:w-2/3 h-96 overflow-auto' ref={containerRef}>
                                        {brand.lstCumRap[itemValue].danhSachPhim.map((movie) => {
                                            return (
                                                <div key={movie.maPhim} className='p-3 md:p-5 border-b flex flex-col md:flex-row gap-5'>
                                                    <div className='w-full flex justify-center md:block md:w-32 '>
                                                        <img src={movie.hinhAnh} alt={movie.tenPhim} className='w-40 md:w-full border shadow-xl hover:scale-105 duration-300' />
                                                    </div>
                                                    <div>
                                                        <h1 className='text-center md:text-lg md:text-left uppercase font-bold mb-3 text-blue-700 hover:underline cursor-pointer duration-300'
                                                            onClick={() => navigate(`/detail/${movie.maPhim}`)}
                                                        >{movie.tenPhim}</h1>
                                                        <div className='text-center md:text-left'>
                                                            <span className='p-1 bg-blue-500 text-sm text-white rounded-sm mr-1 font-medium'>Đang chiếu</span>
                                                            <span className='p-1 bg-orange-500 mr-1 text-sm text-white rounded-sm font-medium'>C13</span>
                                                            {movie.hot ? <span className='p-1 bg-red-500 text-sm text-white rounded-sm font-medium'>Hot</span> : ''}
                                                        </div>
                                                        <h1 className='mt-3 font-bold uppercase'>2D Phụ đề</h1>
                                                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
                                                            {movie.lstLichChieuTheoPhim.slice(0, 12).map((slot) => {
                                                                return (
                                                                    <button className='border font-bold border-blue-400 text-sm rounded-md p-2 md:p-1 text-blue-600 hover:scale-105 hover:bg-blue-600 hover:text-white duration-300'
                                                                        onClick={() => navigate(`/checkout/${slot.maLichChieu}`)}
                                                                        key={slot.maLichChieu}><span className='text-blue-500 font-light'>{dayjs(slot.ngayChieuGioChieu).format('DD/MM/YYYY')}</span> ~ {dayjs(slot.ngayChieuGioChieu).format('hh:mm A')}</button>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
