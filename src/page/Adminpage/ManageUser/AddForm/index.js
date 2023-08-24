import { useFormik } from 'formik';
import React from 'react';
import { GROUP_ID } from '../../../../util/constant';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addUserAction } from '../duck/action';
import { registerSchema } from '../../../../util/schema';
export default function AddUserForm(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUP_ID,
            maLoaiNguoiDung: 'KhachHang',
            hoTen: ''
        },
        onSubmit: (values) => {
            dispatch(addUserAction(values, resetForm, props.closeModal))
        },
        validationSchema: registerSchema
    })
    // xử lý thanh đổi value ô select
    const changeTypeUser = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    };

    const resetForm = () => {
        formik.setFieldValue({
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUP_ID,
            maLoaiNguoiDung: 'KhachHang',
            hoTen: ''
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
                <input type="text" name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full py-1 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.taiKhoan && formik.errors.taiKhoan ? <p className='text-red-600'>{formik.errors.taiKhoan}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full py-1 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full py-1 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                <input type="text" name='soDt' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full py-1 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.soDt && formik.errors.soDt ? <p className='text-red-600'>{formik.errors.soDt}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã loại người dùng</label>
                <Select
                    defaultValue={formik.values.maLoaiNguoiDung}
                    style={{ width: '100%' }}
                    onChange={changeTypeUser}
                    options={[
                        {
                            value: 'KhachHang',
                            label: 'Khách hàng',
                        },
                        {
                            value: 'QuanTri',
                            label: 'Quản trị',
                        },
                    ]}
                />
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên</label>
                <input type="text" name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.hoTen && formik.errors.hoTen ? <p className='text-red-600'>{formik.errors.hoTen}</p> : ''}
            </div>
            <div className='text-right'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập nhật</button>
            </div>
        </form>
    )
}
