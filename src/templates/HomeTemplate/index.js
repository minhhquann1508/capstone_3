import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
export default function HomeTemplate() {
    return (
        <Fragment>
            <Header />
            <div className='pt-24'>
                <Outlet />
            </div>
            <Footer />
        </Fragment>
    )
}
