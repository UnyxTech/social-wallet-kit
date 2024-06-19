import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface iTButton {
  className?: string;
  type?:
    | "primary"
    | "outline"
    | "primaryGray"
    | "purple"
    | "purpleOutline"
    | "red";
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
const TButton = ({
  className,
  children,
  type = "primary",
  disabled,
  onClick,
  ...props
}: iTButton & any) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      className={cn(
        "py-[12px] w-full text-center select-none flex justify-center items-center",
        {
          "bg-primary text-white rounded-[26px]": type === "primary",
          "bg-bgGray text-second rounded-[26px]": type === "primaryGray",
          "bg-transparent text-[#999] rounded-[26px] border-[1px] border-[#6B7280] border-solid hover:!bg-[#555] hover:!text-white hover:!opacity-100":
            type === "outline",
          "bg-purple text-white rounded-[26px] hover:bg-[#6121B2] hover:!opacity-100":
            type === "purple",
          "bg-error text-white rounded-[26px] hover:!bg-[#AD143C] hover:!opacity-100":
            type === "red",
          "bg-white text-purple border-purple border-[1px] border-solid rounded-[26px] hover:!bg-bgPurple hover:!opacity-100":
            type === "purpleOutline",
          "hover:opacity-70 transition-opacity duration-200 ease-in-out":
            !disabled && !isLoading,
          "!bg-bgGray !text-whiteHalf cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled || isLoading}
      onClick={async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
      }}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export { TButton };
