import Nav from "@/components/Nav"
import { useLocale, useTranslations } from "next-intl"
import AvailabilityForm from "./AvailabilityForm"

// Consulta gratuita de disponibilidad de marca. Fondo limpio, sin foto: solo el header y el formulario paso a paso.
const ConsultaDisponibilidad = () => {
  const tNav = useTranslations("Nav")
  const locale = useLocale()

  return (
    <>
      <Nav
        locale={locale}
        tInicio={tNav("inicio")}
        tAbout={tNav("sobreNos")}
        tContacto={tNav("contacto")}
        tServicios={tNav("servicios")}
      />
      <section className="main-padding min-h-screen pt-32 sm:pt-40 pb-16 flex flex-col">
        <AvailabilityForm locale={locale} />
      </section>
    </>
  )
}

export default ConsultaDisponibilidad
