import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletedUserAction, fetchLstUserData, findingUserAction, getUserDataAction } from './duck/action';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal, Skeleton } from 'antd';
import Swal from 'sweetalert2';
import UpdateUserForm from './UpdateForm';
import AddUserForm from './AddForm';
import { useFormik } from 'formik';
export default function ManageUser() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.manageUserReducer);
    const [activePage, setActivePage] = useState(1);
    // lấy thông tin tìm kiếm
    const formik = useFormik({
        initialValues: {
            keyword: ''
        },
        onSubmit: (values) => {
            dispatch(findingUserAction(values.keyword))
        }
    })
    // Mở modal sửa thông tin người dùng
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const showUpdateUser = (taiKhoan) => {
        dispatch(getUserDataAction(taiKhoan, setIsUpdateModalOpen))
    };
    const handleOkUpdateForm = () => {
        setIsUpdateModalOpen(false);
    };
    const handleUpdateFromCancel = () => {
        setIsUpdateModalOpen(false);
    };

    //Mở modal thêm người dùng
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    const handleOkAddForm = () => {
        setIsAddModalOpen(false);
    };
    const handleCancelAddForm = () => {
        setIsAddModalOpen(false);
    };

    // Gọi api danh sách người dùng và trang khởi đầu là 1
    useEffect(() => {
        dispatch(fetchLstUserData(1))
    }, [])
    // Hàm render ra nội dung của table
    const renderTableBody = () => {
        return data?.items.map((user, index) => {
            return (
                <tr key={index} className="border-b border-opacity-20 text-black hover:bg-gray-100 duration-300 cursor-pointer">
                    <td className="p-3">
                        <p>{user.taiKhoan}</p>
                    </td>
                    <td className="p-3">
                        <p>{user.email}</p>
                    </td>
                    <td className="p-3">
                        <p>{user.hoTen}</p>
                    </td>
                    <td className="p-3">
                        <p>{user.soDt}</p>
                    </td>
                    <td className="p-3">
                        <p>{user.maLoaiNguoiDung === 'KhachHang' ? 'Khách hàng' : 'Quản trị'}</p>
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                        <button className='mr-2 bg-red-600 text-white rounded-md hover:scale-105 duration-300 py-2 px-3'
                            onClick={() => deletedUser(user.taiKhoan)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className=' bg-green-600 text-white rounded-md hover:scale-105 duration-300 py-2 px-3'
                            onClick={() => showUpdateUser(user.taiKhoan)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const deletedUser = (taiKhoan) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: "Xóa người dùng sẽ không thể khôi phục trở lại",
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
                dispatch(deletedUserAction(taiKhoan))
            }
        })
    }
    if (loading || error) {
        return new Array(10).fill(null).map((_, index) => {
            return (
                <Skeleton active />
            )
        })
    }
    else {
        return (
            <div className="container p-2 mx-auto sm:p-4">
                <Modal title="Chỉnh sửa thông tin" open={isUpdateModalOpen} footer="" onOk={handleOkUpdateForm} onCancel={handleUpdateFromCancel}>
                    <UpdateUserForm closeModal={setIsUpdateModalOpen} />
                </Modal>
                <Modal title="Thêm tài khoản" footer="" open={isAddModalOpen} onOk={handleOkAddForm} onCancel={handleCancelAddForm}>
                    <AddUserForm closeModal={setIsAddModalOpen} />
                </Modal>
                <h2 className="mb-4 text-2xl font-semibold text-black">Quản lý người dùng</h2>
                <div className='flex justify-end mb-3'>
                    <div className='flex md:flex-row flex-col'>
                        <form className='flex mb-2 md:mb-0' onSubmit={formik.handleSubmit}>
                            <input type="text" name='keyword' onChange={formik.handleChange} placeholder='Tìm kiếm' className='w-2/3 p-2 border rounded-l-md focus:outline-blue-700' />
                            <button type='submit' className='w-1/3 text-xs md:text-base bg-blue-600 p-2 font-medium text-white rounded-r-md hover:bg-blue-700 duration-300'
                            >Tìm kiếm</button>
                        </form>
                        <button className='bg-blue-600 p-2 md:ml-2 font-medium text-white rounded-md hover:bg-blue-700 duration-300'
                            onClick={showAddModal}
                        >Thêm người dùng</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead className="text-black">
                            <tr className="text-left">
                                <th className="p-3">Tài khoản</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Họ tên</th>
                                <th className="p-3">SĐT</th>
                                <th className="p-3">Loại người dùng</th>
                                <th className="p-3"><FontAwesomeIcon icon={faGear} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableBody()}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center space-x-1 mt-8">
                    {new Array(data?.totalPages).fill(null).map((_, index) => {
                        if (activePage === index + 1) {
                            return (
                                <button type="button" key={index} title="Page 1" className="inline-flex border-blue-600 items-center text-blue-600 justify-center w-8 h-8 text-sm font-semibold border-2 rounded shadow-md"
                                    onClick={() => {
                                        dispatch(fetchLstUserData(index + 1))
                                    }}
                                >{index + 1}</button>
                            )
                        }
                        else {
                            return (
                                <button type="button" key={index} className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md"
                                    onClick={() => {
                                        dispatch(fetchLstUserData(index + 1))
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
}
