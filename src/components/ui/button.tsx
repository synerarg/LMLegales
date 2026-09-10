import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-fg disabled:border-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-action-bg text-action-fg shadow-sm hover:bg-action-bg-hover active:bg-action-bg-active",
        destructive:
          "bg-danger text-fg-on-dark shadow-sm hover:bg-danger-hover",
        outline:
          "border border-action-ghost-border bg-transparent text-action-ghost-fg shadow-sm hover:bg-action-ghost-bg-hover active:bg-action-bg active:text-action-fg",
        secondary:
          "bg-surface-sunken text-fg-primary shadow-sm hover:bg-surface-raised",
        ghost: "hover:bg-surface-sunken hover:text-fg-primary",
        link: "text-fg-secondary underline-offset-4 hover:underline hover:text-fg-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
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
