import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "outline-none bg-transparent border-[1px] border-white border-opacity-20 border-solid px-4 py-3 placeholder:text-[14px] font-[400] text-[14px] rounded-[12px] text-white hover:border-[#BDBDBD] leading-[24px]",
          className,
          props.disabled && "hover:border-four"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TInput.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "outline-none border-[1px] border-four border-solid px-[16px] py-[16px] rounded-[12px] text-primary border-bgGray hover:border-[#BDBDBD] focus:border-[#000000] resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TTextarea.displayName = "TTextarea";

export { TInput, TTextarea };
