import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import Statistic from "components/Statistic";
import Timer from "components/Timer";
import TypingArea from "components/TypingArea";
import type React from "react";
import { useCallback } from "react";
import { Select } from "theme-ui";
import useConfigStore from "./store/config";
import { CHANGE_LANGUAGE } from "./store/config/action";
import { TypingStoreProvider } from "./store/typing";
import {
  type Language,
  type Theme,
  language,
  languageFlagMoji,
  theme,
} from "./utils/constant";

const App = () => {
  const { config, dispatch, setTheme } = useConfigStore();

  const handleSelectThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.options[e.target.selectedIndex]
        .value as Theme;
      setTheme(selectedValue);
    },
    [setTheme],
  );

  const handleSelectLanguageChange = useCallback(
    (value: string) => {
      dispatch({
        type: CHANGE_LANGUAGE,
        payload: { lang: value as Language },
      });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 md:px-5 py-3 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Typefaster</h2>
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
          <DropdownMenu.Content
            loop
            className="w-[180px] bg-white shadow-md rounded-md text-zinc-900 overflow-hidden p-1"
            sideOffset={10}
          >
            <DropdownMenu.RadioGroup
              value={config.lang}
              onValueChange={handleSelectLanguageChange}
            >
              <DropdownMenu.RadioItem
                value={language.id}
                className="text-[13px] leading-none rounded-[3px] flex items-center h-[36px] px-3 relative select-none outline-none data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-700"
              >
                🇮🇩 Bahasa Indonesia
                <DropdownMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                value={language.en}
                className="text-[13px] leading-none rounded-[3px] flex items-center h-[36px] px-3 relative select-none outline-none data-[disabled]:text-zinc-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-700"
              >
                🇬🇧 English
                <DropdownMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="flex min-h-[105px] flex-grow flex-col justify-center">
        <TypingStoreProvider lang={config.lang}>
          <Timer duration={config.duration} />
          <TypingArea />
          <div className="mt-4">
            <Statistic />
          </div>
        </TypingStoreProvider>
      </div>
      <div className="py-3 flex items-center flex-col justify-center lg:flex-row lg:justify-between">
        <div className="mb-3">
          &copy; 2020 / Dandi Wiratsangka /{" "}
          <a
            href="https://github.com/dandiws/typefaster"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Github
          </a>
        </div>
        <div className="flex mb-3">
          <Select
            onChange={handleSelectThemeChange}
            sx={{ py: 0, pr: 30, width: "auto", ml: 3 }}
            value={config.theme}
          >
            {Object.entries(theme).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default App;
