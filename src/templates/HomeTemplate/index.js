import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../component/Header'
export default function HomeTemplate() {
    return (
        <Fragment>
            <Header />
            <div className='pt-24'>
                <Outlet />
            </div>
            <div>footer</div>
        </Fragment>
    )
}
