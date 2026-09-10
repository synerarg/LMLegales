import Nav from "@/components/Nav"
import { useTranslations, useLocale } from "next-intl"
import React from "react"
import SectionContainer from "./SectionContainer"
import { ToastContainer } from "react-toastify"

const BrandRegister = () => {
  const tNav = useTranslations("Nav")
  return (
    <>
      <ToastContainer
        autoClose={3000}
      />
      <Nav
        locale={useLocale()}
        tInicio={tNav("inicio")}
        tAbout={tNav("sobreNos")}
        tContacto={tNav("contacto")}
        tServicios={tNav("servicios")}
      />
      <SectionContainer />
    </>
  )
}

export default BrandRegister
