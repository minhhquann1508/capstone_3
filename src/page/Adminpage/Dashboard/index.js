import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actUpdateUser, fetchData } from './duck/action';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../../util/constant';
import { registerSchema } from '../../../util/schema';
export default function Dashboard() {
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(false)
    const { data, loading, error } = useSelector(state => state.dashboardReducer);
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDt: '',
            maNhom: GROUP_ID,
            maLoaiNguoiDung: '',
        },
        validationSchema: registerSchema,
        enableReinitializ: true,
        onSubmit: (values) => {
            dispatch(actUpdateUser(values, setIsUpdate))
        }
    })
    useEffect(() => {
        formik.setValues({
            taiKhoan: data?.taiKhoan || '',
            matKhau: data?.matKhau || '',
            hoTen: data?.hoTen || '',
            email: data?.email || '',
            soDt: data?.soDT || '',
            maNhom: GROUP_ID || '',
            maLoaiNguoiDung: data?.maLoaiNguoiDung || 'QuanTri',
        })
    }, [data])
    if (loading) {
        <div className='bg-black'>Loading...</div>
    }
    else {
        return (
            <section className="p-6">
                <form onSubmit={formik.handleSubmit} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md ">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium md:text-lg">Thông tin tài khoản</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Tài khoản</label>
                                <input type="text" disabled={true} name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Mật khẩu</label>
                                <input type="password" name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                                {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm">Họ tên</label>
                                <input type="text" name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                                {formik.touched.hoTen && formik.errors.hoTen ? <p className='text-red-600'>{formik.errors.hoTen}</p> : ''}
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm">Email</label>
                                <input type="email" disabled={true} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Số điện thoại</label>
                                <input type="text" name='soDt' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                                {formik.touched.soDt && formik.errors.soDt ? <p className='text-red-600'>{formik.errors.soDt}</p> : ''}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Loại người dùng</label>
                                <input type="text" disabled={true} name='maLoaiNguoiDung' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maLoaiNguoiDung} className="p-2 border w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className='col-span-full text-right'>
                                <button type='button' className='w-full mb-2 md:mb-0 md:w-auto bg-white border border-gray-400 p-2 text-black duration-300 font-medium rounded-md hover:scale-105 mr-2'
                                    onClick={() => setIsUpdate(!isUpdate)}
                                >{!isUpdate ? 'Chỉnh sửa' : 'Hủy'}</button>
                                <button type='submit' disabled={!isUpdate} className={`${!isUpdate ? 'cursor-not-allowed bg-gray-600' : 'hover:scale-105 hover:bg-blue-700'} w-full md:w-auto bg-blue-600 p-2 text-white font-medium rounded-md duration-300`}>Cập nhật</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        )
    }
}
