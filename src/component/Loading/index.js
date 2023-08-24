import React from 'react'
import { LOADING_IMG } from '../../util/constant'

export default function Loading() {
    return (
        <div className='relative' style={{ height: '100vh', backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-movie-festival-cinema-blockbuster-watching-background-image-image_785372.jpg")', backgroundSize: 'cover' }}>
            <div className='absolute w-full h-full bg-white opacity-50'>
            </div>
            <div className='w-40 h-40 absolute top-1/2 left-1/2' style={{ transform: 'translate(-50%,-50%)' }}>
                <img src={LOADING_IMG} alt="anh" />
            </div>
        </div >
    )
}
