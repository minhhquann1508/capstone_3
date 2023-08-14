import React, { Fragment } from 'react'
import Carousel from '../../../component/Carousel'
import MovieList from '../../../component/MovieList';
import { Tabs } from 'antd';
import ShowTimeList from '../../../component/ShowTimeList';
const onChange = (key) => {
    console.log(key);
};
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
                    <Tabs defaultActiveKey="dangChieu" centered={true} size='large' items={items} onChange={onChange} />
                </div>
            </section>
            <ShowTimeList />
        </Fragment>
    )
}
