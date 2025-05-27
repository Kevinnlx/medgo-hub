import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        scheduled:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        confirmed:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        "in-progress":
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        completed:
          "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        cancelled:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        pending:
          "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200",
        active:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        inactive:
          "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
        urgent:
          "border-transparent bg-red-500 text-white hover:bg-red-600 animate-pulse",
        normal:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        critical:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        online:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
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