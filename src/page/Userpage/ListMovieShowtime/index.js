import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from './duck/action';
import Carousel from '../../../component/Carousel';
import Trailer from '../../../component/Trailer'
import { Modal, Skeleton } from 'antd';
import dayjs from 'dayjs';
export default function ListMovieShowtime() {
    const [activeMovie, setAciveMovie] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { type } = useParams();
    const { data, loading, error } = useSelector(state => state.listMovieShowtimeReducer);
    useEffect(() => {
        dispatch(fetchData())
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (movie) => {
        setAciveMovie(movie)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const renderData = () => {
        let status = true;
        if (loading || error) {
            <Skeleton
                avatar
                paragraph={{
                    rows: 4,
                }}
            />
        }
        else {
            if (type !== 'dangChieu') {
                status = false;
            }
            return data?.filter((movie) => movie.dangChieu === status).map((movie) => {
                return (
                    <div key={movie.maPhim} className='flex flex-col md:flex-row items-center pt-5 md:p-0 md:items-start bg-gray-50 shadow-lg border rounded-xl overflow-hidden'>
                        <img src={movie.hinhAnh} alt={movie.tenPhim} width={200} className='h-full' />
                        <div className='p-5 w-full flex flex-col justify-around'>
                            <h1 className='uppercase font-bold text-lg text-blue-600 mb-3 hover:underline duration-300 cursor-pointer'
                                onClick={() => navigate(`/detail/${movie.maPhim}`)}
                            >{movie.tenPhim}</h1>
                            <p className='font-medium text-gray-700 mb-2'>Ngày khởi chiếu</p>
                            <p className='text-gray-500 font-normal mb-3'>{dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY   ")}</p>
                            <p className='text-gray-500 mb-5'>{movie.moTa.length > 100 ? `${movie.moTa.slice(0, 100)}...` : movie.moTa}</p>
                            <div className='flex gap-5 justify-end'>
                                <button className='bg-gray-500 p-2 text-white font-medium rounded-md hover:bg-red-600 duration-300'
                                    onClick={() => showModal(movie)}
                                >Xem trailer</button>
                                <button className='bg-blue-500 p-2 text-white font-medium rounded-md hover:bg-blue-600 duration-300'
                                    onClick={() => navigate(`/detail/${movie.maPhim}`)}
                                >Đặt vé</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <Fragment>
            <Modal destroyOnClose footer='' width={1000} title={activeMovie.tenPhim} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Trailer trailer={activeMovie.trailer} />
            </Modal>
            <Carousel />
            <section className='flex justify-center py-10 bg-blue-50'>
                <div className='w-4/5'>
                    <h1 className='mb-10 text-blue-600 font-bold text-3xl text-center'>{type === 'dangChieu' ? 'Phim đang chiếu' : 'Phim sắp chiếu'}</h1>
                    {data?.length > 0 ?
                        <div className='xl:grid-cols-2 grid gap-5'>
                            {renderData()}
                        </div> :
                        <div>
                            <p className='text-center'>
                                Không có thông tin
                            </p>
                        </div>}
                </div>
            </section>
        </Fragment>
    )
}
