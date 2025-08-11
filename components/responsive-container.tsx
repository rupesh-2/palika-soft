import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  padding?: "none" | "sm" | "md" | "lg"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  padding = "md",
  maxWidth = "full",
}: ResponsiveContainerProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2 sm:p-3 md:p-4",
    md: "p-3 sm:p-4 md:p-6 lg:p-8",
    lg: "p-4 sm:p-6 md:p-8 lg:p-12",
  }

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  }

  return (
    <Component
      className={cn(
        "w-full mx-auto",
        paddingClasses[padding],
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </Component>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: "sm" | "md" | "lg"
}

export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 md:gap-6",
    lg: "gap-4 sm:gap-6 md:gap-8",
  }

  const gridCols = `grid-cols-${cols.mobile} sm:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`

  return (
    <div className={cn("grid", gridCols, gapClasses[gap], className)}>
      {children}
    </div>
  )
}

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  size?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

export function ResponsiveText({
  children,
  className,
  as: Component = "p",
  size = { mobile: "sm", tablet: "base", desktop: "lg" },
}: ResponsiveTextProps) {
  const textSize = `text-${size.mobile} sm:text-${size.tablet} lg:text-${size.desktop}`

  return (
    <Component className={cn(textSize, className)}>
      {children}
    </Component>
  )
}

interface ResponsiveButtonProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function ResponsiveButton({
  children,
  className,
  size = "md",
  variant = "default",
  onClick,
  disabled = false,
  type = "button",
}: ResponsiveButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm",
    md: "h-9 px-4 text-sm sm:h-10 sm:px-6 sm:text-base",
    lg: "h-10 px-6 text-base sm:h-12 sm:px-8 sm:text-lg",
  }

  const variantClasses = {
    default: "bg-[#1F4E79] text-white hover:bg-[#1F4E79]/90",
    outline: "border border-[#1F4E79] text-[#1F4E79] hover:bg-[#1F4E79] hover:text-white",
    ghost: "text-[#1F4E79] hover:bg-[#1F4E79]/10",
  }

  return (
    <button
      type={type}
      className={cn(
        "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
