"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, Check, CircleAlert, Loader2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AvailabilitySchema } from "@/lib/validations/Forms"

// Formulario de una pregunta por pantalla, con la misma secuencia que el Typeform que usaba el estudio.
// Visualmente sigue al formulario de contacto: numero chico en fg-muted, campos con linea inferior y el boton principal del sitio.

type ChoiceStep = {
  id: "offer" | "stage" | "holder" | "countries"
  kind: "single" | "multi"
  options: string[]
}
type TextStep = {
  id: "brand" | "description" | "name" | "email" | "whatsapp"
  kind: "text"
}
type Step = ChoiceStep | TextStep

const STEPS: Step[] = [
  { id: "brand", kind: "text" },
  { id: "offer", kind: "single", options: ["products", "services", "both"] },
  { id: "description", kind: "text" },
  { id: "stage", kind: "single", options: ["check", "register"] },
  { id: "holder", kind: "single", options: ["individual", "company"] },
  { id: "countries", kind: "multi", options: ["argentina", "abroad"] },
  { id: "name", kind: "text" },
  { id: "email", kind: "text" },
  { id: "whatsapp", kind: "text" },
]

const LETTERS = ["A", "B", "C", "D"]

// Codigos de pais del selector de WhatsApp. Sin banderas: Windows no dibuja los emoji de banderas.
const COUNTRY_CODES = [
  { iso: "AR", code: "+54" },
  { iso: "UY", code: "+598" },
  { iso: "CL", code: "+56" },
  { iso: "PY", code: "+595" },
  { iso: "BO", code: "+591" },
  { iso: "BR", code: "+55" },
  { iso: "PE", code: "+51" },
  { iso: "CO", code: "+57" },
  { iso: "EC", code: "+593" },
  { iso: "VE", code: "+58" },
  { iso: "MX", code: "+52" },
  { iso: "ES", code: "+34" },
  { iso: "US", code: "+1" },
]

type Values = {
  brand: string
  offer: string
  description: string
  stage: string
  holder: string
  countries: string[]
  name: string
  email: string
  phoneCode: string
  phone: string
}

const INITIAL: Values = {
  brand: "",
  offer: "",
  description: "",
  stage: "",
  holder: "",
  countries: [],
  name: "",
  email: "",
  phoneCode: "+54",
  phone: "",
}


const inputClass =
  "w-full bg-transparent border-b border-border-control py-2 text-xl sm:text-2xl text-fg-primary placeholder:text-fg-placeholder focus-visible:outline-none focus-visible:border-fg-primary focus-visible:shadow-[0_1px_0_0_var(--color-fg-primary)] motion-safe:transition-colors"

const AvailabilityForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("Availability")
  const reduceMotion = useReducedMotion()

  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<Values>(INITIAL)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [honeypot, setHoneypot] = useState("")

  const step = STEPS[stepIndex]
  const isLast = stepIndex === STEPS.length - 1

  // Cada pregunta se monta recien cuando termina de salir la anterior. Al montarse, el foco va al campo
  // (autoFocus) o, si es de opciones, al titulo, para que el lector de pantalla la anuncie.
  const focusField = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      el?.focus({ preventScroll: true })
    },
    []
  )
  const focusHeading = useCallback((el: HTMLHeadingElement | null) => {
    if (el?.dataset.focus === "true") el.focus({ preventScroll: true })
  }, [])

  const validate = useCallback(
    (s: Step, v: Values): string | null => {
      switch (s.id) {
        case "brand":
        case "name":
          return v[s.id].trim().length >= (s.id === "name" ? 2 : 1)
            ? null
            : t("required")
        case "description":
          return v.description.trim().length >= 2 ? null : t("required")
        case "offer":
        case "stage":
        case "holder":
          return v[s.id] ? null : t("required")
        case "countries":
          return v.countries.length > 0 ? null : t("required")
        case "email":
          if (!v.email.trim()) return t("required")
          // Mismo esquema que valida el servidor, para que nunca se acepte aca algo que alla se rechaza.
          return AvailabilitySchema.shape.email.safeParse(v.email).success
            ? null
            : t("invalidEmail")
        case "whatsapp": {
          if (!v.phone.trim()) return t("required")
          const digits = v.phone.replace(/\D/g, "")
          const full = `${v.phoneCode} ${v.phone.trim()}`
          return digits.length >= 6 &&
            digits.length <= 15 &&
            AvailabilitySchema.shape.whatsapp.safeParse(full).success
            ? null
            : t("invalidPhone")
        }
      }
    },
    [t]
  )

  const submit = useCallback(
    async (v: Values) => {
      setStatus("sending")
      setError(null)
      try {
        const res = await fetch("/api/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: v.brand.trim(),
            offer: v.offer,
            description: v.description.trim(),
            stage: v.stage,
            holder: v.holder,
            countries: v.countries,
            name: v.name.trim(),
            email: v.email.trim(),
            whatsapp: `${v.phoneCode} ${v.phone.trim()}`,
            locale,
            website: honeypot,
          }),
        })
        if (!res.ok) throw new Error(`status ${res.status}`)
        setStatus("done")
        window.scrollTo({ top: 0 })
      } catch (err) {
        // warn y no error: el error ya se le muestra a la persona en el formulario.
        console.warn("availability:", err)
        setStatus("idle")
        setError(t("sendError"))
      }
    },
    [honeypot, locale, t]
  )

  const next = useCallback(
    (v: Values = values) => {
      if (status !== "idle") return
      const problem = validate(step, v)
      if (problem) {
        setError(problem)
        return
      }
      setError(null)
      if (isLast) {
        submit(v)
      } else {
        setStepIndex((i) => i + 1)
      }
    },
    [isLast, status, step, submit, validate, values]
  )

  const back = () => {
    setError(null)
    setStepIndex((i) => Math.max(0, i - 1))
  }

  const choose = useCallback(
    (s: ChoiceStep, option: string) => {
      setError(null)
      if (s.kind === "multi") {
        setValues((v) => ({
          ...v,
          countries: v.countries.includes(option)
            ? v.countries.filter((c) => c !== option)
            : [...v.countries, option],
        }))
        return
      }
      // Elegir no avanza solo: se pasa de pregunta con Aceptar o Enter.
      setValues((v) => ({ ...v, [s.id]: option }))
    },
    []
  )

  // Atajos de teclado: letras para elegir opciones y Enter para seguir cuando el foco no esta en un campo.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (status !== "idle") return
      const target = e.target as HTMLElement
      const inField = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)

      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && isLast) {
        e.preventDefault()
        next()
        return
      }
      if (inField || e.ctrlKey || e.metaKey || e.altKey) return

      if (step.kind !== "text") {
        const idx = LETTERS.indexOf(e.key.toUpperCase())
        if (idx >= 0 && idx < step.options.length) {
          e.preventDefault()
          choose(step, step.options[idx])
          return
        }
      }
      if (
        e.key === "Enter" &&
        (target.dataset.option !== undefined ||
          !["BUTTON", "A"].includes(target.tagName))
      ) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [choose, isLast, next, status, step])

  const set = (key: keyof Values, value: string) => {
    setError(null)
    setValues((v) => ({ ...v, [key]: value }))
  }

  const motionProps = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -16 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  }

  if (status === "done") {
    return (
      <motion.div
        {...motionProps}
        className="flex-1 flex flex-col justify-center max-w-3xl"
        role="status"
      >
        <span className="w-12 h-12 rounded-full bg-action-bg text-action-fg inline-flex items-center justify-center">
          <Check aria-hidden="true" className="w-6 h-6" strokeWidth={2.5} />
        </span>
        <h1 className="mt-8 font-dmSerif font-normal text-fg-primary text-[2.25rem] sm:text-[3.5rem] leading-[1.1]">
          {t("done.title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg sm:text-xl text-fg-secondary">
          {t("done.text")}
        </p>
        <div className="mt-10">
          <Link href={"/" + (locale || "")} className={buttonVariants()}>
            {t("done.cta")}
          </Link>
        </div>
      </motion.div>
    )
  }

  const title = t(`${step.id}.title`)
  const number = String(stepIndex + 1).padStart(2, "0")
  const errorId = "availability-error"
  const sending = status === "sending"

  return (
    <div className="flex-1 flex flex-col max-w-3xl w-full">
      {/* Avance: etiqueta, contador y una linea fina que se completa. */}
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-semibold uppercase tracking-wide text-fg-muted">
          {t("eyebrow")}
        </p>
        <p className="text-fg-muted tabular-nums" aria-live="polite">
          {t("step", { current: stepIndex + 1, total: STEPS.length })}
        </p>
      </div>
      <div
        className="mt-3 h-px w-full bg-border-hairline"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={stepIndex + 1}
        aria-label={t("step", { current: stepIndex + 1, total: STEPS.length })}
      >
        <div
          className="h-px bg-fg-primary motion-safe:transition-[width] duration-500"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center py-14 sm:py-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={step.id}
            {...motionProps}
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
            aria-describedby={error ? errorId : undefined}
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="text-fg-muted text-sm tabular-nums shrink-0">
                {number}
              </span>
              <div className="min-w-0">
                <h1
                  ref={focusHeading}
                  data-focus={step.kind !== "text"}
                  tabIndex={-1}
                  id="availability-question"
                  className="font-dmSerif font-normal text-fg-primary text-[1.75rem] sm:text-[2.5rem] leading-[1.15] focus:outline-none"
                >
                  {title}
                  <span className="text-fg-muted" aria-hidden="true">
                    *
                  </span>
                </h1>

                {step.id === "offer" && (
                  <p className="mt-4 max-w-2xl text-lg text-fg-secondary">
                    {t("offer.help")}
                  </p>
                )}
                {step.id === "description" && (
                  <div className="mt-4 max-w-2xl space-y-4 text-lg text-fg-secondary">
                    <p>{t("description.help1")}</p>
                    <p>{t("description.help2")}</p>
                  </div>
                )}

                <div className="mt-10">
                  {step.kind !== "text" ? (
                    <div>
                      {step.kind === "multi" && (
                        <p className="mb-3 text-sm text-fg-secondary">
                          {t("multiHint")}
                        </p>
                      )}
                      <div
                        role={step.kind === "multi" ? "group" : "radiogroup"}
                        aria-labelledby="availability-question"
                        className="flex flex-col gap-3 max-w-md"
                      >
                        {step.options.map((option, i) => {
                          const selected =
                            step.kind === "multi"
                              ? values.countries.includes(option)
                              : values[step.id] === option
                          return (
                            <button
                              key={option}
                              type="button"
                              role={step.kind === "multi" ? "checkbox" : "radio"}
                              aria-checked={selected}
                              data-option
                              onClick={() => choose(step, option)}
                              className={cn(
                                "group w-full flex items-center gap-4 rounded-md border px-4 py-3 text-left text-lg motion-safe:transition-colors",
                                selected
                                  ? "border-action-bg bg-action-bg text-action-fg"
                                  : "border-border-control bg-surface-raised text-fg-primary hover:bg-surface-sunken"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-sm border text-xs font-semibold",
                                  selected
                                    ? "border-action-fg bg-action-fg text-action-bg"
                                    : "border-border-control text-fg-secondary"
                                )}
                              >
                                {LETTERS[i]}
                              </span>
                              <span className="flex-1">
                                {t(`${step.id}.${LETTERS[i].toLowerCase()}`)}
                              </span>
                              {selected && (
                                <Check
                                  aria-hidden="true"
                                  className="w-5 h-5 shrink-0"
                                />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : step.id === "description" ? (
                    <textarea
                      ref={focusField}
                      rows={1}
                      value={values.description}
                      onChange={(e) => {
                        set("description", e.target.value)
                        // Crece con el texto en lugar de mostrar barra de desplazamiento.
                        e.target.style.height = "auto"
                        e.target.style.height = `${e.target.scrollHeight}px`
                      }}
                      onKeyDown={(e) => {
                        // Enter sigue, Shift + Enter hace un salto de linea.
                        if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                          e.preventDefault()
                          next()
                        }
                      }}
                      placeholder={t("placeholder")}
                      aria-labelledby="availability-question"
                      aria-invalid={!!error}
                      className={cn(inputClass, "resize-none overflow-hidden")}
                    />
                  ) : step.id === "whatsapp" ? (
                    <div className="flex items-end gap-3">
                      <select
                        value={values.phoneCode}
                        onChange={(e) => set("phoneCode", e.target.value)}
                        aria-label={t("whatsapp.country")}
                        className={cn(inputClass, "w-auto shrink-0 pr-1 cursor-pointer")}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.iso} value={c.code}>
                            {c.iso} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        ref={focusField}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={values.phone}
                        onChange={(e) =>
                          set("phone", e.target.value.replace(/[^\d\s-]/g, ""))
                        }
                        placeholder={t("whatsapp.placeholder")}
                        aria-labelledby="availability-question"
                        aria-invalid={!!error}
                        className={inputClass}
                      />
                    </div>
                  ) : (
                    <input
                      ref={focusField}
                      type={step.id === "email" ? "email" : "text"}
                      inputMode={step.id === "email" ? "email" : undefined}
                      autoComplete={
                        step.id === "email"
                          ? "email"
                          : step.id === "name"
                            ? "name"
                            : "off"
                      }
                      value={values[step.id as "brand" | "name" | "email"]}
                      onChange={(e) =>
                        set(step.id as "brand" | "name" | "email", e.target.value)
                      }
                      placeholder={
                        step.id === "email"
                          ? t("email.placeholder")
                          : step.id === "brand"
                            ? t("brand.placeholder")
                            : t("placeholder")
                      }
                      aria-labelledby="availability-question"
                      aria-invalid={!!error}
                      className={inputClass}
                    />
                  )}
                </div>

                {error && (
                  <p
                    id={errorId}
                    role="alert"
                    className="mt-4 flex items-center gap-2 text-sm text-danger"
                  >
                    <CircleAlert aria-hidden="true" className="w-4 h-4 shrink-0" />
                    {error}
                  </p>
                )}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className={buttonVariants({ className: "min-w-32" })}
                  >
                    {sending ? (
                      <>
                        <Loader2
                          aria-hidden="true"
                          className="w-5 h-5 animate-spin"
                        />
                        <span className="sr-only">{t("sending")}</span>
                      </>
                    ) : stepIndex === 0 ? (
                      t("brand.cta")
                    ) : isLast ? (
                      t("send")
                    ) : (
                      t("accept")
                    )}
                  </button>
                  <span className="hidden sm:inline text-xs text-fg-muted">
                    {isLast ? t("pressCtrlEnter") : t("pressEnter")}
                  </span>
                  {/* Volver va en la misma fila y a la derecha, lejos de los botones flotantes del pie en celular. */}
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      disabled={sending}
                      className="ml-auto inline-flex items-center gap-2 py-2 text-sm text-fg-secondary hover:text-fg-primary motion-safe:transition-colors"
                    >
                      <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                      {t("back")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.form>
        </AnimatePresence>

        {/* Trampa para bots: fuera de la vista y del orden de tabulacion. */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />
      </div>

    </div>
  )
}

export default AvailabilityForm
