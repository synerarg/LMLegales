"use client"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import MobileMenu from "./navigation/MobileMenu"

import Logo from "../../public/logo.svg"
import LogoCream from "../../public/logo-cream.svg"
import Insta from "../../public/socials/insta.png"
import Linked from "../../public/socials/linkedin.svg"
import Facebook from "../../public/socials/facebook.svg"
import useScrollPosition from "@/hooks/useScrollPosition"
import { useState } from "react"
import ServicesHoverCard from "./navigation/ServicesHoverCard"
import { usePathname } from "next/navigation"

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

  return (
    <div
      className={`w-screen h-20 fixed top-0 z-50 main-padding flex items-center justify-between duration-200 border-b ${
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
      <div className="md:flex hidden items-center gap-6">
        <Link href={"/" + (locale || "")}>
          <h3 className="text-base font-medium">{tInicio}</h3>
        </Link>
        <Link href={"/" + (locale || "") + "/#about-us"}>
          <h3 className="text-base font-medium whitespace-nowrap">{tAbout}</h3>
        </Link>
        <div
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          className="group"
        >
          <div className="text-base font-medium cursor-default flex gap-2">
            <h3>{tServicios}</h3>
            <h3
              className={`transition-all ${
                !isHovering ? "rotate-0" : "rotate-90"
              }`}
            >
              {">"}
            </h3>
          </div>
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                className="bg-surface-raised border border-border-hairline shadow-lg text-fg-primary flex flex-col gap-4 p-6 rounded-md absolute"
              >
                <ServicesHoverCard></ServicesHoverCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link href={"/" + (locale || "") + "/contacto"}>
          <h3
            className={`text-base font-medium py-1 px-3 rounded-xl border border-transparent motion-safe:transition-colors ${
              onDark
                ? "bg-action-inverse-bg text-action-inverse-fg hover:bg-action-inverse-bg-hover active:bg-action-inverse-bg-active"
                : "bg-action-bg text-action-fg hover:bg-action-bg-hover active:bg-action-bg-active"
            } ${!white && "duration-200"}}`}
          >
            {tContacto}
          </h3>
        </Link>
      </div>
      <div className="md:flex hidden items-center justify-center gap-2 w-40">
        <div className="flex gap-2 items-center justify-center mr-4">
          <Link
            href={pathname.replace("/en", "/es")}
            className={`${locale === "es" ? `font-semibold ${onDark ? "text-fg-on-dark" : "text-fg-primary"}` : `font-medium ${onDark ? "text-fg-on-dark-2" : "text-fg-muted"}`}`}
          >
            ES
          </Link>
          <span
            className={`w-px h-5 ${
              scrollPosition > 20
                ? "bg-border-strong"
                : `${white ? "bg-fg-on-dark-2" : "bg-border-strong"}`
            } `}
          ></span>
          <Link
            href={pathname.replace("/es", "/en")}
            className={`${locale === "en" ? `font-semibold ${onDark ? "text-fg-on-dark" : "text-fg-primary"}` : `font-medium ${onDark ? "text-fg-on-dark-2" : "text-fg-muted"}`}`}
          >
            EN
          </Link>
        </div>
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
      </div>
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
