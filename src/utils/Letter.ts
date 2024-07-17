export function getStatus({ original, typed }: { original?: string; typed?: string | null }) {
  if (original && !typed) return 'untyped'
  if (original && typed) return typed === original ? 'correct' : 'incorrect'
  if (!original && typed) return 'extra'
  return null
}

class Letter {
  original: string;
  typed: string | null;
  status: string;

  constructor(original: string, typed: string | null = null) {
    this.original = original;
    this.typed = typed;
    this.status = getStatus({ original, typed });
  }
}

export default Letter
