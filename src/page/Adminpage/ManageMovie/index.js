import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovieAction, fetchLstMovieData, findingMovieAction, getMovieCreateShowtimeAction, getUpdateMovieAction } from './duck/action';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Modal, Skeleton } from 'antd';
import UpdateMovieForm from './UpdateMovieForm';
import AddMovieForm from './AddMovieForm';
import CreateShowtimeForm from './CreateShowtimeForm';
import { useFormik } from 'formik';
import { schemaFinding } from '../../../util/schema';
export default function ManageMovie() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.manageMovieReducer);
    const [activePage, setActivePage] = useState(1);
    useEffect(() => {
        dispatch(fetchLstMovieData(1, setActivePage));
        setActivePage(1);
    }, [])

    const formik = useFormik({
        initialValues: {
            keyword: ''
        },
        validationSchema: schemaFinding,
        onSubmit: (values) => {
            dispatch(findingMovieAction(values.keyword, activePage))
        }
    })

    //Mở modal sửa phim
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const showUpdateModal = (maPhim) => {
        dispatch(getUpdateMovieAction(maPhim, setIsUpdateModalOpen))
    };
    const handleOkUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };
    const handleCancelUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    //Mở modal thêm phim
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    const handleOkAddModal = () => {
        setIsAddModalOpen(false);
    };
    const handleCancelAddModal = () => {
        setIsAddModalOpen(false);
    };

    //Mở modal set lịch chiếu
    const [isCreateShowtime, setIsCreateShowtime] = useState(false);

    const showCreateShowtimeModal = (maPhim) => {
        dispatch(getMovieCreateShowtimeAction(maPhim, setIsCreateShowtime))
    };

    const handleOkCreateShowtimeModal = () => {
        setIsCreateShowtime(false);
    };

    const handleCancelCreateShowtimeModal = () => {
        setIsCreateShowtime(false);
    };

    //Hàm xử lý xóa phim
    const handleDeleteMovie = (maPhim) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: "Xóa phim sẽ không thể khôi phục trở lại",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            reverseButtons: true,
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                //Gửi action xóa user
                dispatch(deleteMovieAction(maPhim, setActivePage))
            }
        })
    }

    const renderTableContent = () => {
        if (loading || error) {
            return new Array(10).fill(null).map((_, index) => {
                return (
                    <Skeleton active />
                )
            })
        }
        else {
            if (data?.items.length === 0) {
                return (
                    <tr>
                        <td>Không có phim phù hợp</td>
                    </tr>
                )
            }
            else {
                return data?.items.map((movie, index) => {
                    return (
                        <tr key={index} className="border-b border-opacity-20 text-black">
                            <td className="p-3">
                                {movie.maPhim}
                            </td>
                            <td className="p-3">
                                <p title={movie.tenPhim}>{movie.tenPhim.slice(0, 50)}</p>
                            </td>
                            <td className="p-3">
                                <p title={movie.moTa}>{movie.moTa.slice(0, 30)}</p>
                            </td>
                            <td className="p-3">
                                <img src={movie.hinhAnh} alt={movie.tenPhim} width={50} height={50} />
                            </td>
                            <td className="p-3">
                                {dayjs(movie.ngayKhoiChieu).format('DD/MM/YYYY')}
                            </td>
                            <td className="p-3">
                                {movie.dangChieu ? 'Đang chiếu' : 'Sắp chiếu'}
                            </td>
                            <td className="p-3">
                                <a target='_blank' href={movie.trailer}>{movie.trailer.slice(0, 15)}</a>
                            </td>
                            <td className="p-3 flex flex-wrap gap-2">
                                <button className='bg-red-600 text-white rounded-md hover:scale-105 duration-300 py-2 px-3'
                                    onClick={() => handleDeleteMovie(movie.maPhim)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className='bg-green-600 text-white rounded-md hover:scale-105 duration-300 py-2 px-3'
                                    onClick={() => showUpdateModal(movie.maPhim)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className='bg-blue-600 text-white rounded-md hover:scale-105 duration-300 py-2 px-3'
                                    onClick={() => showCreateShowtimeModal(movie.maPhim)}
                                >
                                    <FontAwesomeIcon icon={faCalendar} />
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        }
    }
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            {/* Modal sửa phim */}
            <Modal title="Sửa thông tin phim" footer="" open={isUpdateModalOpen} onOk={handleOkUpdateModal} onCancel={handleCancelUpdateModal}>
                <UpdateMovieForm closeModal={handleCancelUpdateModal} setPage={setActivePage} />
            </Modal>
            {/* Modal thêm phim */}
            <Modal title="Form thêm phim" footer="" open={isAddModalOpen} onOk={handleOkAddModal} onCancel={handleCancelAddModal}>
                <AddMovieForm closeModal={handleCancelAddModal} setPage={setActivePage} />
            </Modal>
            <Modal footer='' title="Tạo lịch chiếu" open={isCreateShowtime} onOk={handleOkCreateShowtimeModal} onCancel={handleCancelCreateShowtimeModal}>
                <CreateShowtimeForm closeModal={handleCancelCreateShowtimeModal} setPage={setActivePage} />
            </Modal>
            <h2 className="mb-4 text-2xl font-semibold text-black">Quản lý phim</h2>
            <div className='flex justify-start md:justify-end mb-5'>
                <div className='flex gap-3 flex-col md:flex-row'>
                    <form className='flex' onSubmit={formik.handleSubmit}>
                        <input name='keyword' onChange={formik.handleChange} placeholder='Tìm kiếm theo tên...' type="text" className='border p-2 rounded-l-md w-2/3' />
                        <button type='submit' className='w-1/3 p-2 bg-blue-600 font-medium text-xs md:text-base text-white hover:bg-blue-700 duration-300 rounded-r-md'>Tìm kiếm</button>
                    </form>
                    <button className='p-2 rounded-md bg-blue-600 font-medium text-white hover:bg-blue-700 duration-300'
                        onClick={showAddModal}
                    >Thêm phim</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead>
                        <tr className="text-left text-black">
                            <th className="p-3">Mã phim</th>
                            <th className="p-3">Tên phim</th>
                            <th className="p-3">Mô tả</th>
                            <th className="p-3">Hình ảnh</th>
                            <th className="p-3">Ngày khởi chiếu</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3">Trailer</th>
                            <th className="p-3">Tùy chọn</th>
                        </tr>
                    </thead>
                    {/* Phần nội dung của table */}
                    <tbody>
                        {renderTableContent()}
                    </tbody>
                </table>
            </div>
            {/* Phần pagination */}
            <div className="flex justify-center space-x-1 mt-8">
                {new Array(data?.totalPages).fill(null).map((_, index) => {
                    if (activePage === index + 1) {
                        return (
                            <button type="button" key={index} title="Page 1" className="inline-flex border-blue-600 items-center text-blue-600 justify-center w-8 h-8 text-sm font-semibold border-2 rounded shadow-md"
                                onClick={() => {
                                    dispatch(fetchLstMovieData(index + 1, setActivePage))
                                }}
                            >{index + 1}</button>
                        )
                    }
                    else {
                        return (
                            <button type="button" key={index} className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md"
                                onClick={() => {
                                    dispatch(fetchLstMovieData(index + 1, setActivePage))
                                    setActivePage(index + 1);
                                }}
                            >{index + 1}</button>
                        )
                    }
                })}
            </div>
        </div>
    )
}
