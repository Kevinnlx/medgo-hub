import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white hover:bg-primary-700",
        secondary:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline: "text-black border-primary-200",
        success:
          "border-transparent bg-primary-500 text-white hover:bg-primary-600",
        warning:
          "border-transparent bg-accent-500 text-white hover:bg-accent-600",
        info:
          "border-transparent bg-primary-500 text-white hover:bg-primary-600",
        scheduled:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        confirmed:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        "in-progress":
          "border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200",
        completed:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        cancelled:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        pending:
          "border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200",
        active:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        inactive:
          "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
        urgent:
          "border-transparent bg-red-500 text-white hover:bg-red-600 animate-pulse",
        normal:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        critical:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        online:
          "border-transparent bg-primary-500 text-white hover:bg-primary-600",
        offline:
          "border-transparent bg-gray-500 text-white hover:bg-gray-600"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants } 