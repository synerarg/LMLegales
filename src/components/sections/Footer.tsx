import Link from "next/link"
import Image from "next/image"
import insta from "../../../public/socials/insta.png"
import linkedin from "../../../public/socials/linkedin.svg"
import facebook from "../../../public/socials/facebook.svg"

import logo from "../../../public/logo-cream.svg"
import { useTranslations, useLocale } from "next-intl"
import Newsletter from "../inputs/Newsletter"

// Estructura tomada del footer de bgdlaw.ch: logo a la izquierda, columnas a la derecha con rotulos chicos
// en mayusculas muy espaciadas, una linea fina y una fila de cierre con el copyright y los links legales.
const labelClass =
  "text-xs font-medium uppercase tracking-[0.22em] text-fg-on-dark-muted"
const listClass =
  "mt-5 flex flex-col gap-3 text-sm text-fg-on-dark-2 [&_a:hover]:text-fg-on-dark [&_a]:motion-safe:transition-colors"

const Footer = () => {
  const t = useTranslations("Footer")
  const tToast = useTranslations("Toast")
  const locale = useLocale()

  return (
    <footer className="bg-surface-inverse text-fg-on-dark main-padding pt-24 pb-10">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="flex flex-col gap-12">
          <Image
            src={logo}
            alt="Litvin Marzorati Legales logo"
            width={200}
          ></Image>
          <div className="max-w-xs">
            <h2 className={labelClass}>{t("newsletter")}</h2>
            <div className="mt-5">
              <Newsletter
                label={t("enterEmail")}
                accept={t("accept")}
                submit={t("submit")}
                success={tToast("newsletterSuccess")}
                emailError={tToast("emailError")}
                formError={tToast("formError")}
              ></Newsletter>
            </div>
          </div>
        </div>

        {/* La columna del medio mide lo que su rotulo, asi "Litvin Marzorati Legales" no se parte en dos lineas. */}
        <div className="grid gap-12 sm:grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] sm:gap-10">
          <div>
            <h2 className={labelClass}>{t("services")}</h2>
            <div className={listClass}>
              <Link
                href={"/" + (locale || "") + "/servicios/propiedad-intelectual"}
              >
                {t("intelectual")}
              </Link>
              <Link
                href={"/" + (locale || "") + "/servicios/asesoramiento-general"}
              >
                {t("general")}
              </Link>
              <Link href={"/" + (locale || "") + "/servicios/internet"}>
                {t("internet")}
              </Link>
              <Link href={"/" + (locale || "") + "/servicios/emprendedores"}>
                {t("projects")}
              </Link>
              <Link href={"/" + (locale || "") + "/servicios/metaverso-e-ia"}>
                {t("meta")}
              </Link>
            </div>
          </div>

          <div>
            <h2 className={`${labelClass} whitespace-nowrap`}>
              Litvin Marzorati Legales
            </h2>
            <div className={listClass}>
              <Link href={"/" + (locale || "") + "/" + "#inicio"}>
                {t("inicio")}
              </Link>
              <Link href={"/" + (locale || "") + "/about"}>
                {t("sobreNos")}
              </Link>
              <Link href={"/" + (locale || "") + "/contacto"}>
                {t("contact")}
              </Link>
              <Link
                href={"https://calendly.com/ip-lmlegales"}
                target="_blank"
                className="text-fg-on-dark"
              >
                {t("reunion")}
              </Link>
            </div>
          </div>

          <div>
            <h2 className={labelClass}>{t("contact")}</h2>
            <div className={listClass}>
              <a href="tel:+541147829952">Tel: +54 11 4782-9952</a>
              <a href="mailto:info@lmlegales.com.ar">
                Mail: info@lmlegales.com.ar
              </a>
              <p>
                Avenida del Libertador 5990, piso 3, Buenos Aires, Argentina
              </p>
            </div>
            <div className="mt-6 flex gap-3 invert items-center opacity-70 w-fit">
              <Link
                href={"https://www.instagram.com/lmlegales/"}
                target="_blank"
              >
                <Image
                  src={insta}
                  alt="instagram link"
                  className="w-6 h-6 object-contain"
                ></Image>
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/company/litvin-marzorati-legales/?originalSubdomain=ar"
                }
                target="_blank"
              >
                <Image
                  src={linkedin}
                  alt="linkedin link"
                  className="w-6 h-6 object-contain"
                ></Image>
              </Link>
              <Link href={"https://www.facebook.com/Lmlegales"} target="_blank">
                <Image
                  src={facebook}
                  alt="facebook socials"
                  className="w-6 h-6 object-contain"
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border-hairline-on-dark flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between text-xs uppercase tracking-[0.22em] text-fg-on-dark-muted [&_a:hover]:text-fg-on-dark [&_a]:motion-safe:transition-colors">
        <p>© {new Date().getFullYear()} · Litvin Marzorati Legales</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <Link
            href={
              "/" +
              (locale === "en" ? "en/privacy-policy" : "es/politica-privacidad")
            }
          >
            {t("privacy")}
          </Link>
          <Link
            href={
              "/" +
              (locale === "en"
                ? "en/disclaimer"
                : "es/descargo-de-responsabilidad")
            }
          >
            {t("disclaimer")}
          </Link>
          <Link
            href={
              "/" +
              (locale === "en" ? "en/terms-of-use" : "es/condiciones-de-uso")
            }
          >
            {t("condiciones")}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
