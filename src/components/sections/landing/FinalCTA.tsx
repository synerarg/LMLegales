import CtaButton from "@/components/inputs/Button"
import Heading from "@/components/text/Heading"
import { useLocale, useTranslations } from "next-intl"

const FinalCTA = () => {
  const t = useTranslations("FinalCTA")
  const locale = useLocale()

  return (
    <div className="flex flex-col gap-8 items-center justify-center bg-surface-page bg-center bg-no-repeat bg-cover bg-[url('/assets/finalCTA.png')] text-fg-primary main-padding h-96 py-16">
      <Heading title={t("title")}></Heading>
      <div className="w-full h-max flex justify-center items-center gap-3">
        <CtaButton url="/contacto" locale={locale} text={t("cta")}></CtaButton>
      </div>
    </div>
  )
}

export default FinalCTA
