import { cn } from "lib/utils";
import { useEffect, useRef, useState } from "react";
import useTypingStore from "../store/typing";
import actionType from "../store/typing/action";

const Timer = ({ duration }: React.PropsWithChildren<{ duration: number }>) => {
  const { typing, dispatch } = useTypingStore();
  const [timerCount, setTimerCount] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (typing.typingStatus === "pending") {
      setTimerCount(duration);
    }

    if (typing.typingStatus === "started") {
      timerRef.current = setInterval(
        () => setTimerCount((val) => val - 1),
        1000,
      );
      setTimeout(() => {
        dispatch({ type: actionType.DONE_TYPING });
      }, duration * 1000);
    } else if (typing.typingStatus === "done") {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [typing.typingStatus, dispatch, duration]);

  return (
    <div className="mb-[2px]">
      <div className="flex justify-center mb-4 text-3xl font-bold">
        {timerCount === 0 ? "Times up!" : timerCount}
      </div>
      <ProgressBar duration={duration} status={typing.typingStatus} />
    </div>
  );
};

const ProgressBar = ({
  duration,
  status,
}: { duration: number; status: string }) => {
  return (
    <div className="w-full bg-typingBackground rounded-full h-[1px] overflow-hidden">
      <div
        className={cn(
          "w-full h-full bg-foreground rounded-full transition-transform ease-linear",
          status === "started" ? "animate-progress" : "-translate-x-full",
        )}
        style={
          {
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default Timer;
