import React, { Fragment } from 'react'
import Carousel from '../../../component/Carousel'
import { useFormik } from 'formik'
import { schemaContact } from '../../../util/schema';
import Swal from 'sweetalert2';
export default function Contact() {
    const formik = useFormik({
        initialValues: {
            email: '',
            soDt: '',
            hoTen: '',
            content: ''
        },
        validationSchema: schemaContact,
        onSubmit: (values, { resetForm }) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Chúc mừng!',
                text: 'Thông tin của bạn đã được gửi đi',
                timer: 3000
            }).then(() => {
                resetForm();
            })
        }
    })
    return (
        <Fragment>
            <Carousel />
            {/* Thông tin liên hệ */}
            <section className='flex items-center justify-center bg-gray-600' style={{ backgroundImage: 'url("https://www.cinestar.com.vn/pictures/webimages/7LienHe/650x250.jpg")', height: 500, backgroundSize: 'cover' }}>
                <div className='w-4/5'>
                    <div className='mb-20'>
                        <h1 className='uppercase text-white text-center font-bold text-2xl md:text-3xl mb-5'>Liên hệ</h1>
                        <h1 className='uppercase text-white text-center font-bold text-2xl md:text-3xl'>Cyber Movie</h1>
                    </div>
                    <div>
                        <h1 className='uppercase text-white text-center font-bold text-2xl md:text-3xl mb-5'>Thông tin liên hệ</h1>
                        <h1 className='text-center text-white font-semibold text-xl md:text-3xl mb-3'>Địa chỉ: 135 Hai Bà Trưng, P. Bến Nghé, Q.1, TP.HCM</h1>
                        <h1 className='text-center text-white font-semibold text-xl md:text-3xl'>Hotline: +84 (28) 7300 7279</h1>
                    </div>
                </div>
            </section>
            <section className='flex justify-center bg-blue-50 py-10'>
                <div className="w-4/5 md:w-3/5">
                    <h1 className='font-bold text-xl sm:text-2xl md:text-3xl uppercase text-center text-blue-600 mb-8'>Gửi nội dung liên hệ</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-5'>
                            <input type="text" name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Họ tên' className='focus:outline-blue-600 border border-gray-300 bg-gray-50 py-2 px-5 rounded-full w-full' />
                            {formik.touched.hoTen && formik.errors.hoTen ? <p className='pl-2 text-red-600'>{formik.errors.hoTen}</p> : ''}
                        </div>
                        <div className='flex gap-2 mb-5'>
                            <div className='w-1/2'>
                                <input type="text" name='soDt' value={formik.values.soDt} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Điện thoại' className='focus:outline-blue-600 border border-gray-300 bg-gray-50 py-2 px-5 rounded-full w-full' />
                                {formik.touched.soDt && formik.errors.soDt ? <p className='pl-2 text-red-600'>{formik.errors.soDt}</p> : ''}
                            </div>
                            <div className='w-1/2'>
                                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email' className='focus:outline-blue-600 border border-gray-300 bg-gray-50 py-2 px-5 rounded-full w-full' />
                                {formik.touched.email && formik.errors.email ? <p className='pl-2 text-red-600'>{formik.errors.email}</p> : ''}
                            </div>
                        </div>
                        <div className='mb-5'>
                            <textarea placeholder='Nội dung' name='content' value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} className='focus:outline-blue-600 w-full border px-5 py-2 border-gray-300 bg-gray-50 rounded-2xl resize-none' cols="30" rows="10"></textarea>
                            {formik.touched.content && formik.errors.content ? <p className='pl-2 text-red-600'>{formik.errors.content}</p> : ''}
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='uppercase font-bold text-xl md:text-2xl py-2 px-8 md:px-10 hover:scale-105 duration-300 rounded-full rounded-bl-none bg-blue-600 text-white'>Gửi</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}
