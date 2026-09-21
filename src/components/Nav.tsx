"use client"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import MobileMenu from "./navigation/MobileMenu"

import Logo from "../../public/logo.svg"
import LogoCream from "../../public/logo-cream.svg"
// Iconos de las redes del header, hoy comentadas mas abajo.
// import Insta from "../../public/socials/insta.png"
// import Linked from "../../public/socials/linkedin.svg"
// import Facebook from "../../public/socials/facebook.svg"
import useScrollPosition from "@/hooks/useScrollPosition"
import { useState } from "react"
import ServicesHoverCard from "./navigation/ServicesHoverCard"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  white?: boolean
  tInicio: string
  tServicios: string
  tAbout: string
  tContacto: string
  locale: string
}

const Nav = ({
  white,
  tInicio,
  tAbout,
  tContacto,
  tServicios,
  locale,
}: Props) => {
  const scrollPosition = useScrollPosition()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const [isHovering, setIsHovering] = useState(false)

  const pathname = usePathname()
  // El nav esta sobre una foto oscura cuando la pagina lo pide (white), no se scrolleo y el menu mobile esta cerrado.
  const onDark = !!white && scrollPosition <= 20 && !isOpen
  const linkClass = `motion-safe:transition-colors ${
    onDark ? "hover:text-fg-on-dark-2" : "hover:text-fg-muted"
  }`

  return (
    <div
      className={`w-full h-20 fixed top-0 left-0 z-50 main-padding flex items-center justify-between duration-200 border-b ${
        scrollPosition > 20
          ? "bg-surface-page text-fg-primary border-border-hairline"
          : `${onDark ? "text-fg-on-dark" : "text-fg-primary"} ${
              isOpen
                ? "bg-surface-page border-border-hairline"
                : "bg-transparent border-transparent"
            }`
      }`}
    >
      <Link href={"/" + (locale || "")}>
        <Image
          src={onDark ? LogoCream : Logo}
          alt="Litvin Marzorati Legales"
          className="h-14 w-auto"
          priority
        ></Image>
      </Link>
      {/* For Desktop */}
      {/* Logo a la izquierda y todo el menu agrupado a la derecha: links en mayusculas, separador y el otro idioma. */}
      <nav className="md:flex hidden items-center gap-7 lg:gap-10 xl:gap-14 text-sm font-semibold uppercase tracking-wide">
        <Link href={"/" + (locale || "")} className={linkClass}>
          {tInicio}
        </Link>
        <Link
          href={"/" + (locale || "") + "/#about-us"}
          className={cn(linkClass, "whitespace-nowrap")}
        >
          {tAbout}
        </Link>
        <div
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          className="group relative h-20 flex items-center"
        >
          <div className="cursor-default flex items-center gap-2">
            <span>{tServicios}</span>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={3}
              className={`w-4 h-4 motion-safe:transition-transform duration-200 ${
                !isHovering ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                className="bg-surface-raised border border-border-hairline shadow-lg text-fg-primary normal-case tracking-normal flex flex-col gap-4 p-6 rounded-md absolute top-full -left-6"
              >
                <ServicesHoverCard></ServicesHoverCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link href={"/" + (locale || "") + "/contacto"} className={linkClass}>
          {tContacto}
        </Link>
        <span
          className={`w-px h-5 ${onDark ? "bg-fg-on-dark" : "bg-border-strong"}`}
        ></span>
        {/* Se muestra solo el idioma al que se puede cambiar. */}
        <Link
          href={
            locale === "es"
              ? pathname.replace("/es", "/en")
              : pathname.replace("/en", "/es")
          }
          className={linkClass}
        >
          {locale === "es" ? "EN" : "ES"}
        </Link>
        {/* Redes sociales fuera del header (siguen en el footer y en el menu mobile).
        <Link href={"https://www.instagram.com/lmlegales/"} target="_blank">
          <Image
            src={Insta}
            alt="Instagram socials"
            className={`w-6 h-6 object-contain ${
              scrollPosition > 20
                ? "filter-none"
                : `${white && "filter invert-100"}`
            }`}
          ></Image>
        </Link>
        <Link
          href={
            "https://www.linkedin.com/company/litvin-marzorati-legales/?originalSubdomain=ar"
          }
          target="_blank"
        >
          <Image
            src={Linked}
            alt="LinkedIn socials"
            className={`w-6 h-6 object-contain ${
              scrollPosition > 20
                ? "filter-none"
                : `${white && "filter invert-100"}`
            }`}
          ></Image>
        </Link>
        <Link href={"https://www.facebook.com/Lmlegales"} target="_blank">
          <Image
            src={Facebook}
            alt="Facebook socials"
            className={`w-6 h-6 object-contain ${
              scrollPosition > 20
                ? "filter-none"
                : `${white && "filter invert-100"}`
            }`}
          ></Image>
        </Link>
        */}
      </nav>
      {/* For mobile */}
      <button
        onClick={handleClick}
        className="md:hidden flex flex-col justify-center items-center"
      >
        <span
          className={`bg-fg-primary ${
            scrollPosition > 20
              ? "bg-fg-primary"
              : `${white && !isOpen && "bg-fg-on-dark"}`
          } block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
          }`}
        ></span>
        <span
          className={`bg-fg-primary ${
            scrollPosition > 20
              ? "bg-fg-primary"
              : `${white && !isOpen && "bg-fg-on-dark"}`
          } block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-fg-primary ${
            scrollPosition > 20
              ? "bg-fg-primary"
              : `${white && !isOpen && "bg-fg-on-dark"}`
          } block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs ${
            isOpen ? "-rotate-45" : "translate-y-1"
          }`}
        ></span>
      </button>
      <div
        className={`absolute md:hidden h-screen top-20 z-10 bg-surface-page border-l border-border-hairline transition-all ease-out duration-300 ${
          isOpen
            ? "right-0 sm:w-[50%] w-[70%]"
            : "-right-64 sm:-right-104 w-[40%]"
        }`}
      >
        <MobileMenu
          scrollPosition={scrollPosition}
          white={white}
          isOpen={isOpen}
          tInicio={tInicio}
          tAbout={tAbout}
          tContacto={tContacto}
          tServicios={tServicios}
          locale={locale}
        ></MobileMenu>
      </div>
      <div
        onClick={handleClick}
        className={`absolute md:hidden h-screen w-full z-0 top-20 right-0 bg-overlay-scrim duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 hidden"
        }`}
      ></div>
    </div>
  )
}

export default Nav
