import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 border-3 border-duckie-black bg-duckie-white px-3 py-1 text-[13px] text-duckie-dark font-geist transition-colors outline-none placeholder:text-duckie-brown/60 focus-visible:ring-2 focus-visible:ring-duckie-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
