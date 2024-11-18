import LanguageSwitcher from "components/LanguageSwitcher";
import Statistic from "components/Statistic";
import ThemeSwitcher from "components/ThemeSwitcher";
import Timer from "components/Timer";
import TypingArea from "components/TypingArea";
import useConfigStore from "./store/config";
import { TypingStoreProvider } from "./store/typing";

const App = () => {
  const { config } = useConfigStore();

  return (
    <div className="flex flex-col justify-center min-h-[100svh] px-4 md:px-5 py-3 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Typefaster</h2>
        <div className="flex gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex min-h-[105px] gap-12 flex-grow flex-col justify-center">
        <TypingStoreProvider lang={config.lang}>
          <Timer duration={config.duration} />
          <TypingArea />
          <Statistic />
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
      </div>
    </div>
  );
};

export default App;
