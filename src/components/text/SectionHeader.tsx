import { cn } from "@/lib/utils"

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
}

// Encabezado de seccion alineado a la izquierda: etiqueta chica, titulo en serif y bajada opcional.
// Es el mismo esquema que usan el FAQ y las paginas de servicio.
const SectionHeader = ({ eyebrow, title, subtitle, className }: Props) => {
  return (
    <div className={cn("max-w-2xl space-y-5 text-left", className)}>
      <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
        {eyebrow}
      </p>
      <h2 className="font-dmSerif font-normal text-fg-primary text-[2rem] sm:text-[42px] leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-fg-secondary text-lg max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}

export default SectionHeader
