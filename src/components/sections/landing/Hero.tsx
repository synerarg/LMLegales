"use client"

import HeroFact from "@/components/cards/HeroFact"
import CtaButton from "@/components/inputs/Button"
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
  locale,
}: Props) => {
  return (
    <div
      id="inicio"
      className="bg-cover sm:bg-center bg-position-[center_right_-38rem] bg-[url('/assets/heroBg.png')] pb-10"
    >
      <div className="main-padding pt-64">
        <div className="flex flex-col items-center justify-start gap-12">
          <div className="font-meshedDisplay font-bold 2xl:text-[3.75rem] sm:text-[2.75rem] text-[1.9rem] text-center px-0 max-w-200">
            <h1 className="sm:whitespace-nowrap">{head1}</h1>
            <h1 className="sm:whitespace-nowrap">{head2}</h1>
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
          </div>
          <div className="w-full h-max flex sm:flex-row flex-col  justify-center items-center gap-5">
            {/* <MeetingButton locale={locale} text={cta2} /> */}
            <Link
              href={"https://calendly.com/ip-lmlegales"}
              target="_blank"
              className="sm:px-8 sm:py-4 px-6 py-3 rounded-md bg-action-bg text-action-fg hover:bg-action-bg-hover active:bg-action-bg-active motion-safe:transition-colors"
            >
              <p className="font-medium sm:text-md">{cta2}</p>
            </Link>
            <CtaButton
              className="bg-transparent border border-action-ghost-border text-action-ghost-fg hover:bg-action-ghost-bg-hover active:bg-action-bg active:text-action-fg"
              url="/brand-register"
              locale={locale}
              text={cta1}
            />
          </div>
        </div>
        <div className="3xl:mt-40 mt-24 flex flex-wrap justify-around">
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
