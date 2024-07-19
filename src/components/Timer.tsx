import { useEffect, useRef, useState } from "react";
import { Flex } from "theme-ui";
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
    <Flex
      sx={{
        justifyContent: "center",
        mb: 4,
        fontSize: 4,
        fontFamily: "monospace",
      }}
    >
      {timerCount === 0 ? "Times up!" : timerCount}
    </Flex>
  );
};

export default Timer;
