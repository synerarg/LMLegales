'use client';
import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import React, { MutableRefObject } from 'react';
import SwiperType from 'swiper';
import { useLocale } from 'next-intl';

interface Props {
    left?: boolean,
    swiperRef: MutableRefObject<SwiperType | undefined>,
    handleClick: (dirrection: string) => void,
    clicks: number,
    maxClicks: number,
    alwaysActive?: boolean,
    small?: boolean,
}

const ArrowButton = ({left, swiperRef, handleClick, clicks, maxClicks, alwaysActive, small}: Props) => {
    const locale = useLocale();

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
       <button onClick={handleArrowClick} aria-label={locale === 'es' ? (left ? 'Anterior' : 'Siguiente') : (left ? 'Previous' : 'Next')} className={`group ${small ? 'w-11 h-11' : 'w-16 h-16'} flex items-center justify-center rounded-[100px] border duration-100 motion-safe:transition-colors ${isActive ? 'bg-surface-raised border-border-control hover:bg-action-bg active:bg-action-bg-active' : 'bg-surface-raised border-border-hairline cursor-not-allowed'}`}>
            <Image src={arrow} alt="" width={small ? 22 : 36} className={`${left && 'rotate-180'} ${isActive ? 'group-hover:invert' : 'opacity-40'}`}></Image>
       </button>
    );
};

export default ArrowButton;