import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // La referencia de forma es el boton principal del hero: px-8 py-4 (px-6 py-3 en mobile), rounded-md, text-base.
  // El contorno del outline es un inset-ring y no un borde, asi relleno y outline miden exactamente lo mismo.
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-fg disabled:border-transparent disabled:inset-ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-action-bg text-action-fg hover:bg-action-bg-hover active:bg-action-bg-active",
        // Para fondos oscuros (header sobre foto, footer).
        inverse:
          "bg-action-inverse-bg text-action-inverse-fg hover:bg-action-inverse-bg-hover active:bg-action-inverse-bg-active",
        destructive:
          "bg-danger text-fg-on-dark shadow-sm hover:bg-danger-hover",
        outline:
          "inset-ring inset-ring-action-ghost-border bg-transparent text-action-ghost-fg hover:bg-action-ghost-bg-hover active:bg-action-bg active:text-action-fg",
        secondary:
          "bg-surface-sunken text-fg-primary shadow-sm hover:bg-surface-raised",
        ghost: "hover:bg-surface-sunken hover:text-fg-primary",
        link: "text-fg-secondary underline-offset-4 hover:underline hover:text-fg-primary",
      },
      size: {
        default: "px-6 py-3 sm:px-8 sm:py-4",
        // Compacto, para lugares donde el tamano del hero no entra (header, footer, esquinas).
        sm: "px-3 py-1",
        lg: "px-6 py-3 sm:px-8 sm:py-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
