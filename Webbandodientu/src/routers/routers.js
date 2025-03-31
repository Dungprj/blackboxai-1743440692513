import { lazy } from 'react';

const routers = [
    // {
    //     path: '/',
    //     component: lazy(() => import('@components/HomePage/HomePage'))
    // },
    {
        path: '/blog',
        component: lazy(() => import('@components/Blog/Blog'))
    },
    {
        path: '/',
        component: lazy(() => import('@pages/OurShop/OurShop'))
    },
    {
        path: '/cart',
        component: lazy(() => import('@pages/Cart/Cart'))
    },
    {
        path: '/product/:id',
        component: lazy(() => import('@pages/DetailProduct'))
    }
];

export default routers;
