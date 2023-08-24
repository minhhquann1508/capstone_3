import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { animateScroll as scroll } from 'react-scroll';
export default function BackToTopBtn() {
    const [isScoll, setIsScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        scroll.scrollToTop({
            smooth: true,
            duration: 500, // Thời gian cuộn (miliseconds)
        });
    };
    return (
        <button className={`${!isScoll ? 'hidden' : ''} hover:scale-110 duration-300 hover:bg-blue-700 fixed z-50 bottom-10 right-5 bg-blue-500 text-white w-10 h-10 rounded-full`}><FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} /></button>
    )
}
