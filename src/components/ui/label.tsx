"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils.ts";

// Use 'InferElementRef' instead of 'ElementRef'
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>, // ✅ Updated type
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { htmlFor?: string }
>(({ className, htmlFor, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    htmlFor={htmlFor}  // ✅ Ensure `htmlFor` is passed correctly
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
