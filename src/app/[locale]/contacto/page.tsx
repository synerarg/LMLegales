import Nav from "@/components/Nav"
import ContactHero from "@/components/sections/contact/ContactHero"
import MapSection from "@/components/sections/contact/MapSection"
import { useLocale, useTranslations } from "next-intl"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Contacto = () => {
  const tNav = useTranslations("Nav")
  return (
    <>
      <Nav
        locale={useLocale()}
        tInicio={tNav("inicio")}
        tAbout={tNav("sobreNos")}
        tContacto={tNav("contacto")}
        tServicios={tNav("servicios")}
      />
      <ContactHero />
      <MapSection />
      <ToastContainer
        position="bottom-right"
      />
    </>
  )
}

export default Contacto
