import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { Mail, Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export type Question = {
  q: string
  a: string
}

interface FAQProps {
  title: string
  subtitle: string
  questions: ReturnType<typeof useTranslations>
}

const CONTACT_EMAIL = "info@lmlegales.com.ar"
const WHATSAPP_URL = "https://wa.me/5491163606526"

// Las preguntas se agrupan por etapa. Cada clave es la misma pregunta en es.json y en.json.
const groups = [
  {
    id: "basics",
    keys: ["question1", "question2", "question5", "question4"],
  },
  {
    id: "process",
    keys: ["question6", "question8", "question10", "question11"],
  },
  {
    id: "after",
    keys: ["question3", "question7", "question9"],
  },
] as const

// WhatsApp conserva su verde oficial por decision del cliente.
const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4 shrink-0 text-brand-whatsapp"
  >
    <path
      fill="currentColor"
      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
    />
  </svg>
)

export default function FAQ({ questions, subtitle, title }: FAQProps) {
  return (
    <section className="main-padding py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        {/* Columna izquierda: queda fija mientras se recorren las preguntas. */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
            {questions("eyebrow")}
          </p>
          <h2 className="font-dmSerif font-normal text-fg-primary text-[2rem] sm:text-[42px] lg:text-5xl leading-[1.1]">
            {title}
          </h2>
          <p className="text-fg-secondary text-lg max-w-md">{subtitle}</p>

          <div className="space-y-3 pt-4">
            <p className="text-sm font-medium text-fg-muted">
              {questions("contactLabel")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "gap-2",
                })}
              >
                <WhatsappIcon />
                WhatsApp
              </Link>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "gap-2",
                })}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL}
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha: un solo acordeon para que haya una unica respuesta abierta a la vez. */}
        <Accordion type="single" collapsible className="w-full space-y-12">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-medium text-fg-muted pb-3 border-b border-border-hairline">
                {questions(`groups.${group.id}`)}
              </h3>
              {group.keys.map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger
                    icon={
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-5 w-5 shrink-0 text-fg-muted group-data-[state=open]:text-fg-primary motion-safe:transition-transform duration-200"
                      />
                    }
                    className="gap-6 py-5 text-left text-base sm:text-lg font-medium text-fg-primary hover:no-underline [&[data-state=open]>svg]:rotate-45"
                  >
                    {questions(`questions.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-fg-muted leading-relaxed pb-6 pr-11 max-w-prose">
                    {questions(`questions.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
