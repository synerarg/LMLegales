import FAQ from "../faq/FAQ"
import FinalCTA from "../landing/FinalCTA"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"

interface ServiceData {
  title: string
  p: string
}

interface Props {
  data: ServiceData[]
}

const ServiceBody = ({ data }: Props) => {
  const t = useTranslations("ServicePage")
  const tHero = useTranslations("Hero")

  // En las cinco paginas el primer bloque es la presentacion del servicio: va en la columna fija.
  // El resto son los puntos del servicio, numerados en la columna derecha.
  const [intro, ...items] = data

  return (
    <>
      {/* La foto del hero mide en vh y el hero en px: en pantallas altas la foto llegaba hasta aca.
          El fondo opaco mas el fundido de arriba aseguran que el texto nunca quede sobre la foto. */}
      <section className="relative bg-surface-page main-padding pt-4 pb-20 lg:pb-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-32 h-32 bg-linear-to-t from-surface-page pointer-events-none"
        ></div>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
          {/* Columna izquierda: queda fija mientras se recorren los puntos. */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
              {t("eyebrow")}
            </p>
            <h2 className="font-dmSerif font-normal text-fg-primary text-[2rem] sm:text-[2.5rem] leading-[1.15]">
              {intro.title}
            </h2>
            <p className="text-fg-secondary text-lg leading-relaxed max-w-md">
              {intro.p}
            </p>
            <div className="pt-2">
              <Link
                href={"https://calendly.com/ip-lmlegales"}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants()}
              >
                {tHero("cta2")}
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-fg-muted pb-3 border-b border-border-hairline">
              {t("details")}
            </p>
            <ol>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 sm:gap-x-6 py-8 border-b border-border-hairline"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-medium text-fg-muted tabular-nums pt-1.5"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-dmSerif font-normal text-fg-primary text-xl sm:text-2xl leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-base text-fg-secondary leading-relaxed max-w-prose">
                      {item.p}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FinalCTA></FinalCTA>
    </>
  )
}

export default ServiceBody
