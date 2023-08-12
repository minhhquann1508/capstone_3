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
        ]
    },
    // {
    //     path: '/admin',
    //     element: lazy(() => import('../templates/AdminTemplate')),
    //     nested: [
    //         {}
    //     ]
    // }
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