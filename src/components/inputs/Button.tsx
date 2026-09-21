import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"
import Link from "next/link"

const CtaButton = ({
  text,
  locale,
  url,
  className,
  variant,
}: {
  text?: string
  locale: string
  url: string
  className?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
}) => {
  return (
    <Link
      href={"/" + (locale || "") + url}
      className={cn(buttonVariants({ variant }), className)}
    >
      <h3>{text || "Nada"}</h3>
    </Link>
  )
}

export default CtaButton
