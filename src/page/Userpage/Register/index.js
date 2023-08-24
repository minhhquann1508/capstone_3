import { useFormik } from 'formik'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { GROUP_ID } from '../../../util/constant';
import { useDispatch } from 'react-redux';
import { registerAction } from './duck/action';
import { registerSchema } from '../../../util/schema';
import { useSpring, animated } from '@react-spring/web';
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const props = useSpring({
    from: { opacity: 0, y: -200 },
    to: { opacity: 1, y: 0 },
    config: { duration: 500 }
  })
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUP_ID,
      hoTen: ''
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerAction(values, navigate))
    }
  })
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <animated.form style={{ ...props }} onSubmit={formik.handleSubmit} className="bg-white px-6 py-8 rounded border border-gray-300 shadow-lg text-black w-full">
          <h1 className="mb-5 text-2xl text-blue-600 font-medium text-center">Đăng ký</h1>
          <div className='mb-4'>
            <label className='mb-2 font-medium'>Tài khoản</label>
            <input type="text" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="taiKhoan" />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? <p className='text-red-600'>{formik.errors.taiKhoan}</p> : ''}
          </div>
          <div className='mb-4'>
            <label className='mb-2 font-medium'>Mật khẩu</label>
            <input type="password" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="matKhau" />
            {formik.touched.matKhau && formik.errors.matKhau ? <p className='text-red-600'>{formik.errors.matKhau}</p> : ''}
          </div>
          <div className='mb-4'>
            <label className='mb-2 font-medium'>Email</label>
            <input type="email" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
            {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
          </div>
          <div className='mb-4'>
            <label className='mb-2 font-medium'>Họ tên</label>
            <input type="text" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="hoTen" />
            {formik.touched.hoTen && formik.errors.hoTen ? <p className='text-red-600'>{formik.errors.hoTen}</p> : ''}
          </div>
          <div className='mb-4'>
            <label className='mb-2 font-medium'>Số điện thoại</label>
            <input type="text" className="block border border-grey-light w-full p-2 rounded" onChange={formik.handleChange} onBlur={formik.handleBlur} name="soDt" />
            {formik.touched.soDt && formik.errors.soDt ? <p className='text-red-600'>{formik.errors.soDt}</p> : ''}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-center py-3 rounded text-white font-semibold hover:bg-green-dark focus:outline-none my-1">Đăng ký</button>
          <div className="text-center text-sm text-grey-dark mt-4">
            <p className='text-sm'>Bạn đã có tài khoản ? <NavLink to='/login' className='text-blue-600 hover:underline duration-300 font-medium'>Đăng nhập ngay</NavLink></p>
          </div>
        </animated.form>
      </div>
    </div>
  )
}
