import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { actLogin } from './duck/action';
import { loginSchema } from '../../../util/schema';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(actLogin(values, navigate))
        }
    })
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={formik.handleSubmit} className="bg-white px-6 py-8 rounded border border-gray-300 shadow-md text-black w-full">
                    <h1 className="mb-8 text-2xl font-medium text-blue-600 text-center">Đăng nhập</h1>
                    <div className='mb-4'>
                        <label className='font-medium'>Tài khoản</label>
                        <input type="text" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="taiKhoan" />
                        {formik.touched.taiKhoan && formik.errors.taiKhoan ? <p className='text-red-600'>{formik.errors.taiKhoan}</p> : ''}
                    </div>
                    <div className='mb-4'>
                        <label className='font-medium'>Mật khẩu</label>
                        <input type="password" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="matKhau" />
                        {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
                    </div>
                    <button type="submit" className="w-full text-center font-medium py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1">Đăng nhập</button>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        <p className='text-sm'>Bạn chưa có tài khoản ? <NavLink to='/register' className='font-medium text-blue-600 hover:underline duration-300'>Đăng ký ngay</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
