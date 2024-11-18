import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import useConfigStore from "store/config";
import { type Theme, theme } from "utils/constant";

export default function ThemeSwitcher() {
  const { config, dispatch } = useConfigStore();

  const handleSelectThemeChange = useCallback(
    (theme: string) => {
      dispatch({
        type: "CHANGE_THEME",
        payload: {
          theme: theme as Theme,
        },
      });
    },
    [dispatch],
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="focus:outline-none flex gap-1 items-center px-2 h-[32px] appearance-none text-left text-sm space-x-1"
        >
          <div
            data-theme={config.theme}
            className="w-4 h-4 rounded-full diagonal-split border border-untypedLetter"
          />
          <span>{theme[config.theme] ?? "unknown"}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          loop
          className="w-[180px] bg-background border-typingBackground border shadow-md rounded-md text-foreground overflow-hidden p-1"
          sideOffset={10}
          collisionPadding={16}
        >
          <DropdownMenu.RadioGroup
            value={config.theme}
            onValueChange={handleSelectThemeChange}
          >
            {Object.entries(theme).map(([key, value]) => (
              <DropdownMenu.RadioItem
                value={key}
                className="text-[13px] leading-none rounded-[3px] flex items-center gap-2 h-[36px] px-3 relative select-none outline-none data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-white/5"
                key={key}
              >
                <div
                  data-theme={key}
                  className="w-4 h-4 rounded-full diagonal-split border border-untypedLetter"
                />
                <span>{value}</span>
                <DropdownMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
