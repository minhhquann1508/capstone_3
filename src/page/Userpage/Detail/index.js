import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Skeleton } from 'antd';
import { useNavigate, useParams } from 'react-router'
import { starImg } from '../../../util/constant';
import MovieList from '../../../component/MovieList'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './duck/action';
import moment from 'moment/moment';
import Trailer from '../../../component/Trailer';
import { Link } from 'react-scroll';
export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { loading, data, error } = useSelector(state => state.detailReducer);
    useEffect(() => {
        dispatch(fetchData(id))
    }, [id]);
    const renderDetail = () => {
        if (loading || error) {
            return (
                <Skeleton />
            )
        }
        else {
            return (
                <section className='flex justify-center bg-yellow-50 py-10'>
                    <div className='w-4/5 flex flex-col lg:flex-row'>
                        <div className='flex justify-center lg:block lg:w-1/3'>
                            <img src={data?.hinhAnh} alt={data?.maPhim} className=' object-cover shadow-xl w-72 lg:w-full lg:h-full' />
                        </div>
                        <div className='lg:w-2/3 px-10 mt-10 lg:mt-0 lg:ml-10 py-5 bg-blue-400 shadow-xl'>
                            <h1 className='uppercase font-bold text-xl md:text-3xl mb-2 md:mb-5 text-white'>{data?.tenPhim}</h1>
                            <div className='flex flex-col gap-2 md:gap-3'>
                                <div className='flex gap-3 flex-col md:flex-row md:items-center'>
                                    <label className='md:text-lg w-24 text-gray-100'>Khởi chiếu:</label>
                                    <p className='bg-white py-2 px-5 rounded-tl-3xl rounded-br-3xl font-semibold md:text-lg w-44 text-center'>Từ {moment(data?.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                </div>
                                <div className='flex gap-3 flex-col md:flex-row md:items-center'>
                                    <label className='md:text-lg w-24 text-gray-100'>Trạng thái:</label>
                                    <p className='bg-white py-2 px-5 rounded-tl-3xl rounded-br-3xl font-semibold md:text-lg w-44 text-center'>{data?.hot > 7 ? 'Phim hot' : 'Đang chiếu'}</p>
                                </div>
                                <img className='mt-3' src="https://www.cinestar.com.vn/catalog/view/theme/default/images/nav-icon-2d.png" width={50} height={50} alt="2dlogo" />
                                <p className='text-white mb-3 md:text-lg'>
                                    {data?.moTa}
                                </p>
                                <div className='flex gap-3 items-center mb-5'>
                                    <label className='md:text-lg w-24 text-gray-100 font-light'>Đánh giá:</label>
                                    <div className='flex flex-wrap'>
                                        {new Array(data?.danhGia).fill(null).map((_, index) => {
                                            return (
                                                <img key={index} src={starImg} alt="star" />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-center'>
                                    <button className='p-2 text-xs md:p-3 text-white font-bold md:text-lg rounded-full flex items-center gap-1 md:gap-2 uppercase hover:scale-105 duration-300' style={{ background: 'rgba(0,0,0,0.5)' }}
                                        onClick={showModal}
                                    ><img className='w-6 h-6 md:w-10 md:h-10' src="https://www.cinestar.com.vn/catalog/view/theme/default/images/scl_youtube.png" alt="ytb" /> <span>Trailer</span> </button>
                                    <Link to='lstShowtime' spy={true} smooth={true} duration={500} offset={-70} className='p-2 text-xs md:p-3 bg-white uppercase font-bold md:text-lg rounded-tl-3xl rounded-bl-3xl rounded-br-3xl shadow-2xl hover:scale-105 duration-300 flex items-center cursor-pointer'><span>Suất chiếu</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
    return (
        <Fragment>
            <Modal footer='' destroyOnClose={true} width={1000} title={data?.tenPhim} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Trailer trailer={data?.trailer} />
            </Modal>
            {/* Phần chi tiết */}
            {renderDetail()}
            {/* Phần các suất chiếu đang có */}
            <section className='flex justify-center py-12 bg-blue-50' id='lstShowtime'>
                <div className='w-4/5'>
                    <h1 className='text-blue-600 font-bold text-3xl text-center mb-8'>Suất chiếu</h1>
                    {data?.heThongRapChieu.length <= 0 ?
                        <p className='text-center font-medium'>Hiện chưa có suất chiếu</p> :
                        data?.heThongRapChieu.map((brand) => {
                            return brand.cumRapChieu.map((cinema) => {
                                return (
                                    <div key={cinema.maCumRap} className='border border-gray-300'>
                                        <div className='bg-gray-200 flex items-center p-2 gap-3'>
                                            <img src={brand.logo} className='w-10 h-10 rounded-full bg-white' alt={brand.logo} />
                                            <div>
                                                <h1 className='font-medium'>{cinema.tenCumRap}</h1>
                                                <p className='text-sm hover:underline hover:text-blue-600 duration-300 cursor-pointer'>{cinema.diaChi}</p>
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <h1 className='mb-2 font-medium'>2D Phụ đề</h1>
                                            <div className='flex flex-wrap gap-3'>
                                                {cinema.lichChieuPhim.slice(0, 10).map((slot, index) => {
                                                    return (
                                                        <button key={index} className='py-1 text-blue-700 font-medium px-4 rounded-lg border-blue-600 border hover:bg-blue-600 hover:text-white hover:scale-105 duration-300'
                                                            onClick={() => navigate(`/checkout/${slot.maLichChieu}`)}
                                                        >{moment(slot.ngayChieuGioChieu).format("hh:mm A")}</button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        })}
                </div>
            </section>
            {/* Phần các phim đang chiếu */}
            <section className='flex justify-center py-12 bg-yellow-50'>
                <div className='w-4/5'>
                    <h1 className='text-blue-600 font-bold text-3xl text-center mb-8'>Phim đang chiếu</h1>
                    <MovieList dangChieu={true} />
                </div>
            </section>
        </Fragment>
    )
}
