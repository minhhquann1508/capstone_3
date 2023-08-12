import { useFormik } from 'formik';
import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Login() {
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: ''
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <section className='py-20 flex justify-center'>
            <div className='w-4/5 md:w-2/6'>
                <h1 className='text-center font-bold text-2xl text-blue-600'>Đăng nhập</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Tài khoản</label>
                        <input type="text" name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                        <input type="password" name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    </div>
                    <div className='mb-6'>
                        <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
                    </div>
                    <p className='text-center text-sm font-medium'>Bạn chưa có tài khoản ? Đăng ký <NavLink className='text-blue-600 underline hover:text-blue-700' to="/register">tại đây</NavLink></p>
                </form>
            </div>
        </section>
    )
}
