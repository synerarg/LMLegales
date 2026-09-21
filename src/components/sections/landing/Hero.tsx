"use client"

import HeroFact from "@/components/cards/HeroFact"
import CtaButton from "@/components/inputs/Button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

interface Props {
  head1: string
  head2: string
  type1: string
  type2: string
  type3: string
  type4: string
  type5: string
  type6: string
  fact1: string
  fact2: string
  fact3: string
  cta1: string
  cta2: string
  description: string
  locale: string
}

const Hero = ({
  head1,
  head2,
  type1,
  type2,
  type3,
  type4,
  type5,
  type6,
  fact1,
  fact2,
  fact3,
  cta1,
  cta2,
  description,
  locale,
}: Props) => {
  return (
    // Estructura tomada del hero de tiwis.fr: pantalla completa, titular grande a la izquierda,
    // un parrafo descriptivo y los botones debajo. Los tres numeros van en una fila al pie.
    <div
      id="inicio"
      className="min-h-screen flex flex-col bg-cover sm:bg-center bg-position-[center_right_-38rem] bg-[url('/assets/heroBg.png')]"
    >
      {/* En celular y tablet el pie deja lugar a los botones flotantes (WhatsApp y chat) para que no tapen los numeros. */}
      <div className="main-padding pt-40 sm:pt-56 pb-28 lg:pb-10 flex-1 flex flex-col">
        <div className="flex flex-col items-start justify-start">
          <div className="font-meshedDisplay font-bold lg:text-[4rem] sm:text-[2.75rem] text-[2rem] leading-[1.1] text-left max-w-200">
            <h1 className="sm:whitespace-nowrap">{head1}</h1>
            <h1 className="sm:whitespace-nowrap">{head2}</h1>
            {/* El alto minimo evita que todo salte cuando la palabra animada se borra por completo. */}
            <span className="block min-h-[1.1em]">
            <TypeAnimation
              sequence={[
                type1,
                2000,
                type2,
                2000,
                type3,
                2000,
                type4,
                2000,
                type5,
                2000,
                type6,
                2000,
              ]}
              wrapper="span"
              speed={30}
              deletionSpeed={40}
              repeat={Infinity}
            />
            </span>
          </div>
          <p className="mt-7 sm:mt-9 max-w-[46rem] text-lg sm:text-[1.3rem] leading-normal text-fg-secondary">
            {description}
          </p>
          <div className="mt-9 sm:mt-10 w-full h-max flex sm:flex-row flex-col justify-start items-start gap-5">
            {/* <MeetingButton locale={locale} text={cta2} /> */}
            <Link
              href={"https://calendly.com/ip-lmlegales"}
              target="_blank"
              className={buttonVariants()}
            >
              <p>{cta2}</p>
            </Link>
            <CtaButton
              variant="outline"
              url="/brand-register"
              locale={locale}
              text={cta1}
            />
          </div>
        </div>
        <div className="mt-auto pt-16 grid grid-cols-3 gap-4 sm:flex sm:gap-20">
          <HeroFact num={"+21,500"} title={fact1}></HeroFact>
          <HeroFact num={"+3,700"} title={fact2}></HeroFact>
          <HeroFact
            num={locale === "es" ? "1.ª" : "1st"}
            title={fact3}
          ></HeroFact>
        </div>
      </div>
    </div>
  )
}

export default Hero
