import Nav from "@/components/Nav"
import FAQ from "@/components/sections/faq/FAQ"
import ServiceBody from "@/components/sections/servicios/ServiceBody"
import ServiceHero from "@/components/sections/servicios/ServiceHero"

import {
  propIntelecualData,
  propIntelecualDataEng,
} from "@/utils/servicePages-data"
import { useLocale, useTranslations } from "next-intl"

export default function PropIntelectual() {
  const t = useTranslations("Intelectual")
  const heroData = {
    title: t("title"),
    subtitle: t("subtitle"),
  }
  const tNav = useTranslations("Nav")
  return (
    <>
      <div className="absolute -top-16 bg-no-repeat bg-center bg-[url('/assets/propInelectualBg.png')] w-full h-[124vh] -z-50">
        <div className="w-full absolute bottom-0 h-12 bg-linear-to-t from-surface-page"></div>
      </div>
      <Nav
        white={true}
        locale={useLocale()}
        tInicio={tNav("inicio")}
        tAbout={tNav("sobreNos")}
        tContacto={tNav("contacto")}
        tServicios={tNav("servicios")}
      />
      <div className="z-10">
        <ServiceHero title={heroData.title} subtitle={heroData.subtitle} />
        <ServiceBody
          data={
            useLocale() === "es" ? propIntelecualData : propIntelecualDataEng
          }
        />
      </div>
    </>
  )
}
