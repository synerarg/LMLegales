"use client"

import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import SectionHeader from "@/components/text/SectionHeader"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

type InstagramPost = {
  id: string
  caption: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
}

export default function InstagramFeed() {
  const tInstagram = useTranslations("InstagramFeed")

  const feed = [
    {
      id: "1",
      caption: "Instagram post 1",
      image_url: "/instagram/image-ig-1.jpg",
    },
    {
      id: "2",
      caption: "Instagram post 2",
      image_url: "/instagram/image-ig-2.jpg",
    },
    {
      id: "3",
      caption: "Instagram post 3",
      image_url: "/instagram/image-ig-3.jpg",
    },
    {
      id: "6",
      caption: "Instagram post 6",
      image_url: "/instagram/image-ig-4.jpg",
    },
    {
      id: "4",
      caption: "Instagram post 4",
      image_url: "/instagram/image-ig-5.jpg",
    },
    {
      id: "5",
      caption: "Instagram post 5",
      image_url: "/instagram/image-ig-6.jpg",
    },
  ]

  return (
    <section className="main-padding py-20 lg:py-28 space-y-10 lg:space-y-14">
      {/* Encabezado a la izquierda y el link al perfil a la derecha, en vez del boton centrado. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow={tInstagram("eyebrow")}
          title={tInstagram("title")}
          subtitle={tInstagram("subtitle")}
        />
        <Link
          href="https://www.instagram.com/lmlegales/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 w-fit text-base font-medium text-fg-primary border-b border-border-control pb-1 hover:border-fg-primary motion-safe:transition-colors"
        >
          {tInstagram("cta")}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="h-5 w-5 motion-safe:transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
      {/* Tira compacta: 6 en una fila en desktop, 3 en tablet, 2 en celular. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {feed.map((post, index) => (
          <Link
            href={"https://www.instagram.com/lmlegales/"}
            key={index}
            target="_blank"
            className="block overflow-hidden rounded-md"
          >
            <Image
              src={post.image_url as string}
              alt={tInstagram("alt")}
              width={400}
              height={400}
              unoptimized
              className="w-full aspect-square object-cover motion-safe:transition-transform duration-300 hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
