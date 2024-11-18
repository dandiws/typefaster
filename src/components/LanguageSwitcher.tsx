import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import useConfigStore from "store/config";
import { type Language, language, languageFlagMoji } from "utils/constant";

export default function LanguageSwitcher() {
  const { config, dispatch } = useConfigStore();

  const handleSelectLanguageChange = useCallback(
    (value: string) => {
      dispatch({
        type: "CHANGE_LANGUAGE",
        payload: { lang: value as Language },
      });
    },
    [dispatch],
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="focus:outline-none w-[42px] h-[32px] appearance-none text-left text-sm space-x-1"
        >
          <span>{languageFlagMoji[config.lang]}</span>
          <span className="ml-1">{config.lang.toUpperCase()}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          loop
          className="w-[180px] bg-background border-typingBackground border shadow-md rounded-md  overflow-hidden p-1"
          sideOffset={10}
        >
          <DropdownMenu.RadioGroup
            value={config.lang}
            onValueChange={handleSelectLanguageChange}
          >
            <DropdownMenu.RadioItem
              value={language.id}
              className="text-[13px] leading-none rounded-[3px] flex items-center h-[36px] px-3 relative select-none outline-none data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-white/5 "
            >
              🇮🇩 Bahasa Indonesia
              <DropdownMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value={language.en}
              className="text-[13px] leading-none rounded-[3px] flex items-center h-[36px] px-3 relative select-none outline-none data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-white/5 "
            >
              🇬🇧 English
              <DropdownMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
