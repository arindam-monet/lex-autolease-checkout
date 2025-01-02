import * as React from "react"
import { Slot as RadixSlot, SlotProps } from "@radix-ui/react-slot"

const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => (
  <RadixSlot ref={ref} {...props}>
    {children}
  </RadixSlot>
))

Slot.displayName = "Slot"

export { Slot }