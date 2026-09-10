"use client"
import { A11y, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperType from "swiper"

import MediaCard from "@/components/cards/MediaCard"
import ArrowButton from "@/components/inputs/ArrowButton"
import Heading from "@/components/text/Heading"
import { useRef } from "react"

import mediaData from "@/utils/media-data"
import useClicks from "@/hooks/useSliderClick"

interface Props {
  header: Header
}

const Media = ({ header }: Props) => {
  const swiperLen = mediaData.length
  const { clicks, handleClick } = useClicks(0, swiperLen)
  const swiperRef = useRef<SwiperType | undefined>(undefined)

  return (
    <div className="flex lg:flex-row flex-col lg:gap-0 gap-8 justify-between lg:items-start items-center main-padding pt-24 sm:mb-24 mb-20">
      <div className="flex flex-col gap-10 max-w-[24rem]">
        <Heading
          title={header.title}
          subtitle={header.subtitle}
          notCentered={true}
        />
        <div className="gap-[0.85rem] lg:flex hidden">
          <ArrowButton
            left={true}
            clicks={clicks}
            maxClicks={swiperLen - 1}
            handleClick={handleClick}
            swiperRef={swiperRef}
            alwaysActive
          />
          <ArrowButton
            clicks={clicks}
            maxClicks={swiperLen - 1}
            handleClick={handleClick}
            swiperRef={swiperRef}
            alwaysActive
          />
        </div>
      </div>
      <div className="lg:w-xl w-[24rem] relative">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          // En desktop: 24px de aire entre notas y el slide mide lo mismo que la imagen (426px),
          // asi la nota vecina asoma ~50px de cada lado sin recortarse. (576 - 24/3) / (4/3) = 426
          breakpoints={{ 1024: { slidesPerView: 4 / 3, spaceBetween: 24 } }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {mediaData.map((object, index) => (
            <SwiperSlide
              key={index}
              className="sm:pl-0 pl-[10%] overflow-hidden"
            >
              <MediaCard image={object.src}></MediaCard>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Fundido a crema sobre los bordes: la nota que asoma se desvanece en vez de cortarse */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-linear-to-l from-surface-page to-transparent"
        ></span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-linear-to-r from-surface-page to-transparent"
        ></span>
      </div>
      <div className="gap-[0.85rem] lg:hidden flex">
        <ArrowButton
          left={true}
          clicks={clicks}
          maxClicks={swiperLen - 1}
          handleClick={handleClick}
          swiperRef={swiperRef}
          alwaysActive
        />
        <ArrowButton
          clicks={clicks}
          maxClicks={swiperLen - 1}
          handleClick={handleClick}
          swiperRef={swiperRef}
          alwaysActive
        />
      </div>
    </div>
  )
}

export default Media
