export function getStatus({
  original,
  typed,
}: { original?: string | null; typed?: string | null }) {
  if (original && !typed) return "untyped";
  if (original && typed) return typed === original ? "correct" : "incorrect";
  if (!original && typed) return "extra";
  return null;
}

class Letter {
  original: string | null;
  typed: string | null;
  status: string | null;

  constructor(original: string | null, typed: string | null = null) {
    this.original = original;
    this.typed = typed;
    this.status = getStatus({ original, typed });
  }
}

export default Letter;
