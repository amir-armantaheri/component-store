import {isRef, toRaw} from 'vue'

const MAX_DEPTH = 3
const MAX_ITEMS = 8

/**
 * Renders a value for display. Traverses proxies (not raw objects) so that
 * nested mutations still re-trigger whatever effect is formatting, but uses
 * raw identity for cycle detection.
 */
export function formatValue(value: unknown, depth = 0, seen: Set<object> = new Set()): string {
  if (isRef(value)) return formatValue(value.value, depth, seen)
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'

  switch (typeof value) {
    case 'string':
      return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
    case 'number':
    case 'boolean':
    case 'bigint':
      return String(value)
    case 'symbol':
      return value.toString()
    case 'function':
      return `ƒ ${value.name || 'anonymous'}()`
  }

  const identity = toRaw(value as object)
  if (seen.has(identity)) return '[circular]'
  if (depth >= MAX_DEPTH) return Array.isArray(value) ? '[…]' : '{…}'

  seen.add(identity)
  try {
    if (value instanceof Map) return `Map(${value.size})`
    if (value instanceof Set) return `Set(${value.size})`
    if (Array.isArray(value)) {
      const items = value.slice(0, MAX_ITEMS).map((item) => formatValue(item, depth + 1, seen))
      return `[${items.join(', ')}${value.length > MAX_ITEMS ? ', …' : ''}]`
    }
    const keys = Object.keys(value as object)
    const body = keys.slice(0, MAX_ITEMS).map((key) => `${key}: ${formatValue((value as Record<string, unknown>)[key], depth + 1, seen)}`)
    return `{${body.join(', ')}${keys.length > MAX_ITEMS ? ', …' : ''}}`
  } finally {
    seen.delete(identity)
  }
}
