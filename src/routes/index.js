import { lazy } from "react";
import { Route } from "react-router-dom";

const routes = [
    {
        path: '',
        element: lazy(() => import('../templates/HomeTemplate')),
        nested: [
            {
                path: '/',
                element: lazy(() => import('../page/Userpage/Home'))
            },
            {
                path: '/detail/:id',
                element: lazy(() => import('../page/Userpage/Detail'))
            },
            {
                path: '/checkout/:id',
                element: lazy(() => import('../page/Userpage/Checkout'))
            },
            {
                path: '/about',
                element: lazy(() => import('../page/Userpage/About'))
            },
            {
                path: '/contact',
                element: lazy(() => import('../page/Userpage/Contact'))
            },
            {
                path: '/login',
                element: lazy(() => import('../page/Userpage/Login'))
            },
            {
                path: '/register',
                element: lazy(() => import('../page/Userpage/Register'))
            },
            {
                path: '/showtime/:type',
                element: lazy(() => import('../page/Userpage/ListMovieShowtime'))
            },
            {
                path: '/info/:type',
                element: lazy(() => import('../page/Userpage/Info'))
            },
        ]
    },
    {
        path: '/admin',
        element: lazy(() => import('../templates/AdminTemplate')),
        nested: [
            {
                path: '/admin/dashboard',
                element: lazy(() => import('../page/Adminpage/Dashboard'))
            },
            {
                path: '/admin/manageUser',
                element: lazy(() => import('../page/Adminpage/ManageUser'))
            },
            {
                path: '/admin/manageMovie',
                element: lazy(() => import('../page/Adminpage/ManageMovie'))
            },
        ]
    }
]


export const renderRoutes = () => {
    return routes.map((route, index) => {
        if (route.nested) {
            return (
                <Route key={index} path={route.path} element={<route.element />}>
                    {route.nested.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.element />}
                        />
                    ))}
                </Route>
            )
        }
        else {
            return (
                <Route key={route.path} path={route.path} element={<route.element />} />
            );
        }
    })
}