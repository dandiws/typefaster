const Hotkey = ({ children }: React.PropsWithChildren) => {
  return (
    <span className="rounded-md px-2 py-1 leading-[15px] bg-foreground text-background font-mono text-sm mx-2">
      {children}
    </span>
  );
};

export default Hotkey;
