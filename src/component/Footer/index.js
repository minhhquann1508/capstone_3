import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchData } from './duck/action';

export default function Footer() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.footerReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    return (
        <footer className="bg-gray-700 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Phim</h2>
                        <ul className="text-white dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <NavLink to='/showtime/dangChieu' className=" hover:underline">Phim đang chiếu</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to='/showtime/sapChieu' className="hover:underline">Phim sắp chiếu</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Thông tin hỗ trợ</h2>
                        <ul className="text-white dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <NavLink to='/about' className="hover:underline">Tin tức</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to='/contact' className="hover:underline">Liên hệ</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Liên kết</h2>
                        <ul className="text-white dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="https://www.facebook.com/cgvcinemavietnam" className='block' target='_blank'>
                                    <img width={35} height={35} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="anh" />
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="https://www.instagram.com/cgvcinemasvietnam/?hl=vi" target='_blank' className='block'>
                                    <img width={35} height={35} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="anh" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Hệ thống rạp</h2>
                        <ul className="text-white grid grid-cols-3 w-2/3 gap-2 dark:text-gray-400 font-medium">
                            {data?.map((item, index) => {
                                return (
                                    <li key={index} className="mb-4">
                                        <a href={item.linkFB} target='_blank' className='block'>
                                            <img className='bg-white rounded-full' width={35} height={35} src={item.hinhAnh} alt="anh" />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
