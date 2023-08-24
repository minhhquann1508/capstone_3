import React, { Fragment, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import { useSelector } from 'react-redux'
import Loading from '../../component/Loading'
import AppProduce from '../../component/AppProduce'
import BackToTopBtn from '../../component/BackToTopBtn'
export default function HomeTemplate() {
    const { userLogin } = useSelector(state => state.loginReducer);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        if (userLogin?.maLoaiNguoiDung === 'QuanTri') {
            navigate('/admin/dashboard');
        }
        setLoading(true);
        const isLoading = setTimeout(() => {
            setLoading(false);
        }, 1000)
        return () => {
            clearTimeout(isLoading);
        }
    }, [location])
    if (loading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <Fragment>
                <Header />
                <div className='pt-24'>
                    <Outlet />
                </div>
                <AppProduce />
                <BackToTopBtn />
                <Footer />
            </Fragment>
        )
    }
}
