import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, updateInfoAction } from '../duck/action';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../../../util/constant';
import { registerSchema } from '../../../../util/schema'
export default function InfoForm() {
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(false);
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
        enableReinitialize: true,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            dispatch(updateInfoAction(values, setIsUpdate));
        }
    })
    const { data, loading, error } = useSelector(state => state.infoReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, []);
    useEffect(() => {
        formik.setValues({
            taiKhoan: data?.taiKhoan || '',
            matKhau: data?.matKhau || '',
            hoTen: data?.hoTen || '',
            email: data?.email || '',
            soDt: data?.soDT || '',
            maNhom: GROUP_ID || '',
            maLoaiNguoiDung: data?.maLoaiNguoiDung || '',
        })
    }, [data])
    return (
        <section className="p-6">
            <form onSubmit={formik.handleSubmit} className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Thông tin tài khoản</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Tài khoản</label>
                            <input type="text" disabled={true} onChange={formik.handleChange} onBlur={formik.handleBlur} name='taiKhoan' value={formik.values.taiKhoan} className="cursor-not-allowed border p-2 w-full rounded-md focus:ring focus:ri focus:ri" />
                            {formik.touched.taiKhoan && formik.errors.taiKhoan ? <p className='text-red-600'>{formik.errors.taiKhoan}</p> : ''}
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Mật khẩu</label>
                            <input type="password" disabled={!isUpdate} onChange={formik.handleChange} onBlur={formik.handleBlur} name='matKhau' value={formik.values.matKhau} className="border p-2 w-full rounded-md focus:ring focus:ri focus:ri" />
                            {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm">Họ tên</label>
                            <input type="text" disabled={!isUpdate} onChange={formik.handleChange} onBlur={formik.handleBlur} name='hoTen' value={formik.values.hoTen} className="border p-2 w-full rounded-md focus:ring focus:ri focus:ri" />
                            {formik.touched.hoTen && formik.errors.hoTen ? <p className='text-red-600'>{formik.errors.hoTen}</p> : ''}
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm">Email</label>
                            <input type="email" disabled={true} onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} className="cursor-not-allowed border p-2 w-full rounded-md focus:ring focus:ri focus:ri" />
                            {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm">Số điện thoại</label>
                            <input type="text" disabled={!isUpdate} onChange={formik.handleChange} onBlur={formik.handleBlur} name='soDt' value={formik.values.soDt} className="border p-2 w-full rounded-md focus:ring focus:ri focus:ri" />
                            {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
                        </div>
                        <div className='flex justify-end col-span-full'>
                            <div className='flex flex-col md:flex-row gap-2 w-full'>
                                <button type='button' className='w-full md:w-auto bg-white border border-gray-400 p-2 text-black duration-300 font-medium rounded-md hover:scale-105 mr-2'
                                    onClick={() => setIsUpdate(!isUpdate)}
                                >{isUpdate ? 'Hủy' : 'Chỉnh sửa'}</button>
                                <button type='submit' disabled={!isUpdate} className={`${isUpdate ? 'hover:scale-105 hover:bg-blue-700' : 'cursor-not-allowed'} w-full md:w-auto bg-blue-600 p-2 text-white font-medium rounded-md duration-300`}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}
