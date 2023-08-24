import React, { Fragment } from 'react'
import Carousel from '../../../component/Carousel'
import MovieList from '../../../component/MovieList';
import { Tabs } from 'antd';
import CinemaList from '../../../component/CinemaList';
import DetailListCinema from '../../../component/DetailListCinema';
const items = [
    {
        key: 'dangChieu',
        label: `PHIM ĐANG CHIẾU`,
        children: <MovieList dangChieu={true} />,
    },
    {
        key: 'sapChieu',
        label: `PHIM SẮP CHIẾU`,
        children: <MovieList dangChieu={false} />,
    },
];
export default function Home() {
    return (
        <Fragment>
            <Carousel />
            <section className='flex justify-center py-20 shadow'>
                <div className='w-4/5'>
                    <Tabs style={{ fontFamily: 'movieFont' }} defaultActiveKey="dangChieu" centered={true} size='large' items={items} />
                </div>
            </section>
            <CinemaList />
            <DetailListCinema />
        </Fragment>
    )
}
