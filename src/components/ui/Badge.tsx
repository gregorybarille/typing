import { type HTMLAttributes } from "react"
import { cn } from "../../lib/utils.ts"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "destructive"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        {
          default: "bg-primary text-primary-foreground",
          secondary: "bg-secondary text-secondary-foreground",
          success: "bg-green-100 text-green-800",
          destructive: "bg-destructive/10 text-destructive",
        }[variant],
        className,
      )}
      {...props}
    />
  )
}
