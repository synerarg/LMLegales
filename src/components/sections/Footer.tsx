import Link from "next/link"
import Image from "next/image"
import insta from "../../../public/socials/insta.png"
import linkedin from "../../../public/socials/linkedin.svg"
import facebook from "../../../public/socials/facebook.svg"

import logo from "../../../public/logo-cream.svg"
import { useTranslations, useLocale } from "next-intl"
import Newsletter from "../inputs/Newsletter"

const Footer = () => {
  const t = useTranslations("Footer")
  const tToast = useTranslations("Toast")
  const locale = useLocale()

  return (
    <div className="bg-surface-inverse text-fg-on-dark md:text-xl text-base flex flex-col gap-20 main-padding py-28 pb-12">
      <div className="flex md:flex-row flex-col md:gap-0 gap-16 justify-between items-start">
        <div className="flex flex-col gap-6">
          <h2 className="text-[1.75rem] font-medium">{t("services")}</h2>
          <div className="flex flex-col gap-3 text-sm text-fg-on-dark-2 [&_a:hover]:text-fg-on-dark">
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
        <div className="flex flex-col gap-6">
          <h2 className="text-[1.75rem] font-medium">
            Litvin Marzorati Legales
          </h2>
          <div className="flex flex-col gap-3 text-sm text-fg-on-dark-2 [&_a:hover]:text-fg-on-dark">
            <Link href={"/" + (locale || "") + "/" + "#inicio"}>
              {t("inicio")}
            </Link>
            <Link href={"/" + (locale || "") + "/about"}>{t("sobreNos")}</Link>
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
        <div className="flex flex-col gap-6">
          <h2 className="text-[1.75rem] font-medium">{t("newsletter")}</h2>
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
      <div className="flex gap-2 items-center justify-center">
        <span className="w-full h-px bg-border-hairline-on-dark"></span>
        <div className="flex gap-3 invert w-80 justify-center items-center opacity-70">
          <Link href={"https://www.instagram.com/lmlegales/"} target="_blank">
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
        <span className="w-full h-px bg-border-hairline-on-dark"></span>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex md:flex-row flex-col md:gap-0 gap-16 md:items-center justify-between">
          <Image
            src={logo}
            alt="Litvin Marzorati Legales logo"
            width={200}
          ></Image>
          <div className="flex flex-col gap-3 text-sm w-72">
            <h3>Tel: +54 11 4782-9952</h3>
            <h3>Mail: info@lmlegales.com.ar</h3>
            <h3>
              Avenida del Libertador 5990, piso 3, Buenos Aires, Argentina
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center text-xs gap-2 text-fg-on-dark-muted [&_a:hover]:text-fg-on-dark">
          <Link
            href={
              "/" +
              (locale === "en" ? "en/privacy-policy" : "es/politica-privacidad")
            }
          >
            {t("privacy")}
          </Link>
          <h3>-</h3>
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
          <h3>-</h3>
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
    </div>
  )
}

export default Footer
