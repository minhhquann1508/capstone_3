import React from 'react'
import ReactPlayer from 'react-player/youtube'
export default function Trailer(props) {
    return (
        // Only loads the YouTube player
        <ReactPlayer playing={true} controls height={400} width={'100%'} url={props.trailer} />
    )
}
