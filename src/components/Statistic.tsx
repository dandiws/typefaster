import useTypingStore from "../store/typing";

const ListItem = ({
  title,
  children,
  ...props
}: React.PropsWithChildren<{ title: string }>) => {
  return (
    <div className="p-2  rounded-md w-[120px] text-center" {...props}>
      <div className="text-sm text-zinc-400 mb-2">{title}</div>
      <div className="text-xl font-bold">{children}</div>
    </div>
  );
};

const Statistic = () => {
  const { typing } = useTypingStore();
  const { statistics } = typing;
  const { accuracy, wpm, correctWords, incorrectWords } = statistics;

  return (
    <div className="flex w-full justify-center flex-row gap-3">
      <ListItem title="WPM">{wpm >= 0 ? wpm : "-"}</ListItem>
      <ListItem title="Accuracy">
        {accuracy >= 0 ? `${accuracy * 100}%` : "-"}
      </ListItem>
      <ListItem title="Correct words">
        {correctWords >= 0 ? correctWords : "-"}
      </ListItem>
      <ListItem title="Incorrect words">
        {incorrectWords >= 0 ? incorrectWords : "-"}
      </ListItem>
      {/* <ListItem>Time: {time >= 0 ? time : '-'}</ListItem> */}
    </div>
  );
};

export default Statistic;
