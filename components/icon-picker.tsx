"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

/**
 * @description icon picker component
 */
export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
        <PopoverContent className="p-0 w-full border-none">
          <EmojiPicker
            height={400}
            width={400}
            theme={theme}
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
