'use client';
import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import React, { MutableRefObject } from 'react';
import SwiperType from 'swiper';

interface Props {
    left?: boolean,
    swiperRef: MutableRefObject<SwiperType | undefined>,
    handleClick: (dirrection: string) => void,
    clicks: number,
    maxClicks: number,
    alwaysActive?: boolean,
}

const ArrowButton = ({left, swiperRef, handleClick, clicks, maxClicks, alwaysActive}: Props) => {
    const handleArrowClick = () => {
        if(swiperRef.current) {
            if(!left){
                swiperRef.current.slideNext();
                handleClick('next');
                return;
            }

            swiperRef.current.slidePrev();
            handleClick('prev');
        }
    }

    // Estado visual del control: activo si hay slides en esa direccion, inactivo si no.
    // En carrusel circular las flechas nunca se desactivan.
    const isActive = alwaysActive || (left ? clicks !== 0 : clicks !== (maxClicks + 1));

    return (
       <button onClick={handleArrowClick} className={`group w-16 h-16 flex items-center justify-center rounded-[100px] border duration-100 motion-safe:transition-colors ${isActive ? 'bg-surface-raised border-border-control hover:bg-action-bg active:bg-action-bg-active' : 'bg-surface-raised border-border-hairline cursor-not-allowed'}`}>
            <Image src={arrow} alt="arrow" width={36} className={`${left && 'rotate-180'} ${isActive ? 'group-hover:invert' : 'opacity-40'}`}></Image>
       </button>
    );
};

export default ArrowButton;