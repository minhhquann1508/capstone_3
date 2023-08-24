import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../../../util/constant';
import { updateUserAction } from '../duck/action';
import { registerSchema } from '../../../../util/schema';
export default function UpdateUserForm(props) {
    const { userUpdate } = useSelector(state => state.manageUserReducer);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: userUpdate.taiKhoan,
            matKhau: userUpdate.matKhau,
            email: userUpdate.email,
            soDt: userUpdate.soDT,
            maNhom: GROUP_ID,
            maLoaiNguoiDung: userUpdate.maLoaiNguoiDung,
            hoTen: userUpdate.hoTen
        },
        enableReinitialize: true,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            dispatch(updateUserAction(values, props.closeModal))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
                <input type="text" disabled={true} name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.taiKhoan && formik.errors.taiKhoan ? <p className='text-red-600'>{formik.errors.taiKhoan}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" disabled={true} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                <input type="text" name='soDt' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.soDt && formik.errors.soDt ? <p className='text-red-600'>{formik.errors.soDt}</p> : ''}
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã loại người dùng</label>
                <input type="text" disabled={true} name='maLoaiNguoiDung' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maLoaiNguoiDung} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên</label>
                <input type="text" name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.hoTen && formik.errors.hoTen ? <p className='text-red-600'>{formik.errors.hoTen}</p> : ''}
            </div>
            <div className='text-right'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập nhật</button>
            </div>
        </form>
    )
}
