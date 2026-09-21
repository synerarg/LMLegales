"use client"
import { A11y, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperType from "swiper"

import MediaCard from "@/components/cards/MediaCard"
import ArrowButton from "@/components/inputs/ArrowButton"
import SectionHeader from "@/components/text/SectionHeader"
import { useRef } from "react"

import mediaData from "@/utils/media-data"
import useClicks from "@/hooks/useSliderClick"

interface Props {
  header: Header
}

// Estructura tomada de "Nos dernieres nouvelles" de imk.ca: encabezado a la izquierda, control a la derecha
// y debajo una fila de cuatro fichas a todo el ancho. Como son nueve recortes, la fila sigue siendo carrusel.
const Media = ({ header }: Props) => {
  const swiperLen = mediaData.length
  const { clicks, handleClick } = useClicks(0, swiperLen)
  const swiperRef = useRef<SwiperType | undefined>(undefined)

  return (
    <section className="main-padding py-20 lg:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow={header.eyebrow}
          title={header.title}
          subtitle={header.subtitle}
        />
        <div className="flex gap-3">
          <ArrowButton
            small
            left={true}
            clicks={clicks}
            maxClicks={swiperLen - 1}
            handleClick={handleClick}
            swiperRef={swiperRef}
            alwaysActive
          />
          <ArrowButton
            small
            clicks={clicks}
            maxClicks={swiperLen - 1}
            handleClick={handleClick}
            swiperRef={swiperRef}
            alwaysActive
          />
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          loop={true}
          slidesPerView={1.35}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 36 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {mediaData.map((object, index) => (
            <SwiperSlide key={index}>
              <MediaCard image={object.src}></MediaCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Media
