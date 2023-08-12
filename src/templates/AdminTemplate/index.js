import React from 'react'
import { Outlet } from 'react-router-dom'
export default function AdminTemplate() {
    return (
        <div>
            <div>header</div>
            <Outlet />
            <div>footer</div>
        </div>
    )
}
