import Image from "next/image"
import { useTranslations } from "next-intl"

import award1 from "../../../../public/awards/award1.png"
import award2 from "../../../../public/awards/award2.png"
import award3 from "../../../../public/awards/award3.png"
import award4 from "../../../../public/awards/award4.png"
import award5 from "../../../../public/awards/award5.png"
import award6 from "../../../../public/awards/award6.png"
import award7 from "../../../../public/awards/award7.png"
import award8 from "../../../../public/awards/award8.png"
import award9 from "../../../../public/awards/award9.png"

const awards = [award1, award2, award3, award4, award5, award6, award7, award8, award9]

// Version quieta del carrusel de premios (LogoMarquee): etiqueta que dice que son y los nueve logos
// en una sola fila entre dos lineas finas. En pantallas chicas pasan a una grilla de 3x3.
// LogoMarquee sigue existiendo: para volver al desfile alcanza con cambiar el componente en page.tsx.
const AwardsStrip = () => {
  const t = useTranslations("Awards")

  return (
    <section className="main-padding pt-12 lg:pt-16 pb-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
        {t("label")}
      </p>
      <ul className="mt-6 border-y border-border-hairline py-8 grid grid-cols-3 gap-x-6 gap-y-8 place-items-center lg:flex lg:items-center lg:justify-between">
        {awards.map((award, index) => (
          <li key={index}>
            {/* Los logos son imagenes chicas: se muestran a su tamano real, solo se limita el alto para emparejarlos. */}
            <Image src={award} alt="award" className="h-auto w-auto max-h-12 lg:max-h-[3.75rem]" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AwardsStrip
