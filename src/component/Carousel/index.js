import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './duck/action';
export default function Carousel() {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(state => state.bannerReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    console.log('loading', loading);
    console.log('data', data);
    console.log('error', error);
    if (loading) {
        return (
            <div>...Loading</div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}
