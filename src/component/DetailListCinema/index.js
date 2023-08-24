import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './duck/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
export default function DetailListCinema() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.detailListCinemaReducer);
    useEffect(() => {
        dispatch(fetchData())
    }, []);
    const renderContent = () => {
        return data?.map((cinema) => {
            return (
                <div key={cinema.maRap} className='cursor-pointer hover:bg-gray-50 duration-300 flex items-center gap-4 bg-white shadow-lg p-5 border rounded-lg'>
                    <div className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex justify-center items-center'>
                        <img src={cinema.hinhAnh} alt={cinema.tenRap} />
                    </div>
                    <div>
                        <h1 className='font-semibold mb-2 text-blue-600 text-lg'>{cinema.tenRap}</h1>
                        <p className='text-gray-600 text-sm mb-2'>{cinema.moTa}</p>
                        {new Array(cinema.danhGia).fill(null).map((_, index) => {
                            return (
                                <FontAwesomeIcon icon={faStar} key={index} className='text-orange-400 mx-0.5 mb-2' />
                            )
                        })}
                        <div className='flex items-center gap-5'>
                            <p className='text-gray-500 text-sm mb-2 underline'><FontAwesomeIcon icon={faLocationDot} /> {cinema.soCumRap} cụm rạp</p>
                            <p className='text-gray-500 text-sm mb-2 underline'><FontAwesomeIcon icon={faMagnifyingGlass} /> {cinema.soLuotDanhGia} đánh giá</p>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <section className='py-10 md:py-20 flex justify-center bg-blue-50'>
            <div className='w-4/5'>
                <h1 className='text-center text-blue-600 font-bold text-3xl mb-10'>Hệ thống rạp chiếu</h1>
                <div className='grid md:grid-cols-2 gap-8'>
                    {renderContent()}
                </div>
            </div>
        </section>
    )
}
