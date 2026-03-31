import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border-2 px-2 py-0.5 text-[10px] font-bold font-mono whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-duckie-primary border-duckie-black text-duckie-black",
        pending:
          "bg-duckie-pending-bg border-duckie-primary text-duckie-pending-text",
        done:
          "bg-duckie-done-bg border-duckie-green text-duckie-green-dark",
        secondary:
          "bg-duckie-white border-duckie-black text-duckie-dark",
        outline:
          "border-duckie-black text-duckie-dark bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
