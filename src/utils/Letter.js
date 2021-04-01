export function getStatus({ original, typed } = {}) {
  if (original && !typed) return 'untyped'
  if (original && typed) return typed === original ? 'correct' : 'incorrect'
  if (!original && typed) return 'extra'
  return null
}

function Letter(original, typed = null) {
  this.original = original
  this.typed = typed
  this.status = getStatus({ original, typed })
}

export default Letter
