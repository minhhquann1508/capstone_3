import React, { Fragment } from 'react'
import Carousel from '../../../component/Carousel'
import MovieList from '../../../component/MovieList'
export default function Home() {
    return (
        <Fragment>
            <Carousel />
            <MovieList />
            <div>Home</div>
        </Fragment>
    )
}
